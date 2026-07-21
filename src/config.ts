import dotenv from 'dotenv';

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || '3001', 10);

export const DATABASE_URL: string = process.env.DATABASE_URL || process.env.MONGODB_URI || '';

export const JWT_SECRET: string = process.env.JWT_SECRET || 'jwt_secret';
