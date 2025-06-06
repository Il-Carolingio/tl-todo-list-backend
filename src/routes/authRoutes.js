import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    loginUser,
    registerUser,
    generateTestToken,
    getCurrentUser  // Nuevo controlador específico
} from '../controllers/authController.js';

const router = express.Router();

// Ruta de prueba (elimínala en producción)
router.get('/me-test', (req, res) => {
    console.log('Ruta de prueba accedida');
    res.json({ test: 'OK' });
});

// Ruta para obtener info del usuario autenticado
router.get('/me', authMiddleware, (req, res) => {
    res.json(req.user); // Devuelve los datos del usuario
});

//Ruta para obtener la generacion de un token de prueba
router.post('/test-token', generateTestToken);


router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;