import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import bodyParser from 'body-parser';

const app = express();

// 1. Middlewares básicos (orden correcto)
app.use(helmet()); // Seguridad primero
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parseo de JSON
app.use(bodyParser.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para formularios URL-encoded

// Configuración CORS 
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Añade los métodos necesarios
    credentials: true // Para permitir cookies/tokens
}));


// Rutas
// 3. Rutas (registro único por ruta)
app.use('/api/auth', authRoutes); // Todas las rutas de auth bajo /api/auth
app.use('/api/tasks', taskRoutes); // Rutas de tasks bajo /api/tasks
app.use('/api/test-token',authRoutes); // Ruta para crear un nuevo token de prueba
app.use('/api/my-tasks', taskRoutes)// Ruta para obtener tareas por usuario actual


// Middleware de errores (siempre al final)
app.use(errorMiddleware);

export default app;