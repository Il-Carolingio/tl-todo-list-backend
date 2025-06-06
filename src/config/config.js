import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuración para Sequelize CLI (requiere estructura específica por entorno)
const sequelizeConfig = {
  development: {
    username: process.env.DB_USER || 'todouser',
    password: process.env.DB_PASSWORD || 'todopassword',
    database: process.env.DB_NAME || 'todo_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Tu configuración actual (para el resto de la app)
const appConfig = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret_key_dev',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }
};

// Exportaciones
export const databaseConfig = sequelizeConfig; // Para Sequelize
export default { ...sequelizeConfig, ...appConfig }; // Para tu aplicación