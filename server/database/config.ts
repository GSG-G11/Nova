import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let URL:string | undefined;

const {
  NODE_ENV, DEV_DATABASE_URL, DATABASE_URL, TEST_DATABASE_URL,
} = process.env;

switch (NODE_ENV) {
  case 'development':
    URL = DEV_DATABASE_URL;
    break;
  case 'production':
    URL = DATABASE_URL;
    break;
  case 'test':
    URL = TEST_DATABASE_URL;
    break;
  default:
    throw new Error('NODE_ENV is not set');
}

async function startDb() {
  try {
    if (!URL) {
      throw new Error('DB_URL is not defined');
    }
    const db = await mongoose.connect(URL, {
      ignoreUndefined: true,
    });
    console.log('Connected to DB');
    return db;
  } catch (error) {
    return error;
  }
}

export default startDb;
