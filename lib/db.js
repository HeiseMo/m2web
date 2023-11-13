import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // This line loads the environment variables from the .env file

async function connectToDatabase() {
  // Create the connection to the database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  return connection;
}

export default connectToDatabase;