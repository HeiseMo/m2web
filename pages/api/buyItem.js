import connectToDatabase from '../../lib/db';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Ensure we're dealing with a POST request
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Read the token from the cookie header
  const token = req.cookies.token;

  // Verify the token and extract the user ID
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database using the decoded user ID
    const db = await connectToDatabase();
    const [user] = await db.execute('SELECT * FROM account WHERE login = ?', [decoded.username]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve item details from the request body
    const { vnum, quantity } = req.body;
    if (!vnum || !quantity) {
      return res.status(400).json({ message: 'Vnum and quantity are required' });
    }
    const pdb = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'player' // This will now refer to 'player' database
      });
      

    // Insert item into the player.item_award table
    const insertResult = await pdb.execute(
      'INSERT INTO player.item_award(login, vnum, count, mall) VALUES (?, ?, ?, ?)',
      [decoded.username, vnum, quantity, 1]
    );

    if (insertResult[0].affectedRows > 0) {
      return res.status(200).json({ message: 'Purchase successful' });
    } else {
      return res.status(500).json({ message: 'Unable to complete the purchase' });
    }
  } catch (error) {
    // If there's an error (token is invalid, expired, etc.)
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}
