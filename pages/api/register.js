// pages/api/register.js

import connectToDatabase from '../../lib/db';
import bcrypt from 'bcryptjs';
import validator from 'validator';
var CryptoJS = require("crypto-js");


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    function hashPassword(password) {
        // First SHA1 hash, output as a binary string (raw binary data)
        var rawHash = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(password));
        var binaryStr = rawHash.toString(CryptoJS.enc.Latin1);
    
        // Convert the binary string to a WordArray
        var wordArray = CryptoJS.enc.Latin1.parse(binaryStr);
    
        // Second SHA1 hash of the binary data
        var finalHash = CryptoJS.SHA1(wordArray);
    
        // Prepend asterisk and convert to uppercase hexadecimal
        return "*" + finalHash.toString(CryptoJS.enc.Hex).toUpperCase();
    }
    const { username, email, password, delcode } = req.body;
console.log(username, email, password)
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'The email address is invalid.' });
    }

    try {
        const db = await connectToDatabase();
        const [userWithUsername] = await db.execute('SELECT * FROM account WHERE login = ?', [username]);
        const [userWithEmail] = await db.execute('SELECT * FROM account WHERE email = ?', [email]);

        if (userWithUsername.length > 0) {
            db.end();
            return res.status(409).json({ message: 'Username unavailable.' });
        }

        if (userWithEmail.length > 0) {
            db.end();
            return res.status(409).json({ message: 'This email is already used by another account.' });
        }

        var hashedPassword = hashPassword(password);
        console.log(hashedPassword);
        const status_register = 'OK'; // Replace with your logic for status
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME format

        const expireDate = "20991218131717"; // Example expiration date or logic for calculating it

        await db.execute('INSERT INTO account (login, password, social_id, email, create_time, status, gold_expire, silver_expire, safebox_expire, autoloot_expire, fish_mind_expire, marriage_fast_expire, money_drop_rate_expire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [username, hashedPassword, delcode, email, currentTime, status_register, expireDate, expireDate, expireDate, expireDate, expireDate, expireDate, expireDate]);

        db.end();
        return res.status(201).json({ message: 'Your account has been successfully created! You can now log in to the game.' });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
