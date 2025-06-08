import { Sequelize } from 'sequelize';
import sequelizeConfig from '../config/config.js';
import mysql2 from 'mysql2';



const env = process.env.NODE_ENV || 'development';
const dbConfig = sequelizeConfig[env];

console.log('Configuración usada:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  ssl: dbConfig.dialectOptions?.ssl
});

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect:'mysql',
    dialectModule: mysql2,
    dialectOptions: {
      ssl:{
        require:true,
        rejectUnauthorized: false
      }},
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire:60000,
      idle:30000}
  }
);
// Verificación de conexión
try {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL establecida');
} catch (error) {
  console.error('❌ Error de conexión a MySQL:', error);
  process.exit(1);
}
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
console.log('Configuración cargada:', sequelizeConfig);
console.log('Entorno actual:', process.env.NODE_ENV);
  // Exportación consolidada
  export {sequelize, User, Task}