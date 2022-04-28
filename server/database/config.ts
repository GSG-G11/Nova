import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DB_URL } = process.env;

async function startDb() {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL is not defined');
    }
    const db = await mongoose.connect(DB_URL);
    console.log('Connected to DB');
    return db;
  } catch (error) {
    console.log('Error connecting to DB');
    return error;
  }
}

export default startDb;
