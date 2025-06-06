import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool
  }
);

// Importación directa (más confiable que dinámica)
import userModel from './Users.js';
import taskModel from './Task.js';

// Inicialización explícita
const User = userModel(sequelize);
const Task = taskModel(sequelize);

if (User.associate) {
  User.associate({ Task }); // El usuario tiene muchas tareas
}

if (Task.associate) {
  Task.associate({ User }); // Cada tarea pertenece a un usuario
}
  
  // Exportación consolidada
  export {sequelize, User, Task}