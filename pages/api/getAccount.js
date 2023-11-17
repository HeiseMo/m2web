import connectToDatabase from '../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    // Read the token from the cookie header
    const token = req.cookies.token; // The key 'token' should match the cookie name
    console.log(token)
    // Verify the token and extract the user ID
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      // Fetch user data from the database using the decoded user ID
      const db = await connectToDatabase();
      const [user] = await db.execute('SELECT * FROM account WHERE login = ?', [decoded.username]);
    console.log([user], "user")
      if (user.length > 0) {
        return res.status(200).json({ accountName: user[0].login });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // If there's an error (token is invalid, expired, etc.)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }