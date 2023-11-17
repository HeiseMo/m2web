// pages/api/login.js
import connectToDatabase from '../../lib/db';
var CryptoJS = require("crypto-js");
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; // Ideally stored in environment variables

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    // Additional validation can be added here if needed

    try {
        const db = await connectToDatabase();
        const [user] = await db.execute('SELECT * FROM account WHERE login = ?', [username]);

        if (user.length === 0) {
            db.end();
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Verify the password
        const passwordIsValid = checkPassword(password, user[0].password);
        if (passwordIsValid) {
            // Create a token
            const token = jwt.sign({ username: user[0].login }, JWT_SECRET, { expiresIn: '1h' });

             // Set the token as a cookie in the response
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);
    
            // Send the token back to the client
            return res.status(200).json({ message: 'Successfully logged in!', token });
        }
        if (!passwordIsValid) {
            db.end();
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Login successful, implement session or token creation logic here

        db.end();
        return res.status(200).json({ message: 'Successfully logged in!' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    function checkPassword(enteredPassword, storedPassword) {
        // Assuming you're using the same hash function as in your registration
        var hashedEnteredPassword = hashPassword(enteredPassword);
        return hashedEnteredPassword === storedPassword;
    }
    
    function hashPassword(password) {
        // Your existing hash function from register.js
        var rawHash = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(password));
        var binaryStr = rawHash.toString(CryptoJS.enc.Latin1);
        var wordArray = CryptoJS.enc.Latin1.parse(binaryStr);
        var finalHash = CryptoJS.SHA1(wordArray);
        return "*" + finalHash.toString(CryptoJS.enc.Hex).toUpperCase();
    }    
}

