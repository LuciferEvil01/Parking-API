import * as mongoose from 'mongoose';
import { Pool } from 'pg';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export const connectPostgres = () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
  });

  pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
  });

  pool.on('error', (error) => {
    console.error('Error connecting to PostgreSQL', error);
    process.exit(1);
  });

  return pool;
};
