import dotenv from 'dotenv';
dotenv.config();

export const DB_NAME = process.env.DB_NAME || 'todo_db';
export const DB_USER = process.env.DB_USER || 'todouser';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DIALECT = process.env.DB_DIALECT || 'mysql';