//Funcion para crear el token
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config(); // Carga variables de entorno

export const generateToken = (user) => {
  // 1. Convertir datos a Base64
  const payload = {
    id: user.id,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    //exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 días
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '7d'
  });

  return token;
};