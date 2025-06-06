import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Validación inicial del header
    const authHeader = req.headers.authorization;
    console.log('Token enviado', authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // 2. Limpieza más robusta del token
    const cleanAuthHeader = authHeader
      .replace(/\n/g, ' ') // Elimina saltos de línea
      .replace(/\s+/g, ' ') // Normaliza espacios
      .trim();

    // 3. Extracción segura del token
    const tokenParts = cleanAuthHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }

    const token = tokenParts[1];
    
    // 4. Validación estructural del JWT
    const jwtParts = token.split('.');
    if (jwtParts.length !== 3) {
      return res.status(401).json({ message: 'Invalid JWT structure' });
    }

    // 5. Verificación del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 6. Validación del usuario
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    const response = {
      error: 'Authentication failed',
      details: error.message
    };

    if (error.name === 'JsonWebTokenError') {
      response.error = 'Invalid token';
      return res.status(401).json(response);
    }
    
    if (error.name === 'TokenExpiredError') {
      response.error = 'Token expired';
      return res.status(401).json(response);
    }

    return res.status(500).json(response);
  }
};