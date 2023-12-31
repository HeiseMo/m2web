import connectToDatabase from '../../lib/db';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

function imageExists(imagePath) {
  try {
    // Path to the public directory
    const publicDirectory = path.join(process.cwd(), 'public');
    // Full path to the image
    const fullPath = path.join(publicDirectory, imagePath);
    // Check if the file exists
    return fs.existsSync(fullPath);
  } catch (error) {
    console.error('Error checking image:', error);
    return false;
  }
}
function getAllItemsWithoutImages(items) {
  // Path to the public directory
  const publicDirectory = path.join(process.cwd(), 'public');
  
  // Filter out items that do not have an associated image
  const itemsWithoutImages = items.filter(item => {
    const imagePath = `/icons/${item.vnum.toString().padStart(5, '0')}.png`;
    const fullPath = path.join(publicDirectory, imagePath);
    return !fs.existsSync(fullPath);
  });

  return itemsWithoutImages;
}
export default async function handler(req, res) {

    if (req.method === 'GET') {
      try {
        const db = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: "player"
          });
          /*3,16,18,21,28*/
          const [rows] = await db.execute(`
          SELECT 
          vnum, 
          CONVERT(locale_name USING utf8) as readable_locale_name 
        FROM 
          player.item_proto 
        WHERE 
          type IN (3, 5, 16, 18, 21, 28) 
          AND vnum != 50050;
        `);
        await db.end();
        const items = [
          /* ... your items with a vnum property ... */
        ];
        
        // Get all items without images
        const itemsWithoutImages = getAllItemsWithoutImages(items);
        console.log(itemsWithoutImages);
        const itemsWithImages = rows.map(item => {
          let imageUrl = `/icons/${item.vnum.toString().padStart(5, '0')}.png`;
          if (imageExists(imageUrl)) {
            return {
              ...item,
              imageUrl
            };
          }
          imageUrl='/noimage.png'
          return {
            ...item,
            imageUrl
          };
        });
      const filteredItems = itemsWithImages.filter(item => item !== null);
        await db.end();
        res.status(200).json(filteredItems);
          } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }