import mysql from 'mysql2/promise';


export default async function handler(req, res) {

    if (req.method === 'GET') {
      try {
        const db = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: "player"
          });
          const [rows] = await db.execute(`SELECT id,name,level,job,exp,gold FROM player.player WHERE DATE_SUB(NOW(), INTERVAL 10 MINUTE) < last_play;`);
        await db.end();
        res.status(200).json([rows]);
          } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }