import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test';

async function startDb() {
  const db = await mongoose.connect(DB_URL);
  console.log('Connected to DB');
  return db;
}

export default startDb;
