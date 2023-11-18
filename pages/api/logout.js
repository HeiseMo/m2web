// pages/api/logout.js

export default function handler(req, res) {
    // Set the cookie's expiration date to the past to delete it
    res.setHeader('Set-Cookie', 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: 'Logged out successfully' });
  }
  