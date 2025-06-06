// authController.js
import  {User}  from '../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

//Controlador para usuario actual
export const getCurrentUser = (req, res) => {
  try {
    // Verifica que el usuario esté adjuntado
    if (!req.user) {
      throw new Error('Usuario no encontrado en la solicitud');
    } else {
      console.log('Usuario autenticado:', req.user); // Para debug
      res.json({
        user: req.user.id,
        email: req.user.email,
        message: 'Datos de usuario obtenidos'
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

//Para regenerar token solo llamando a la funcion
export const generateTestToken = async (req, res) => {
  try{
  const { id, email } = req.body; // Obtener datos del cuerpo de la petición
  console.log('Estos son los datos',id, email)
  // Validación de campos requeridos
  if (!id || !email) {
    return res.status(400).json({ 
      error: 'Datos incompletos',
      required: ['id', 'email'],
      received: { id, email }
    });
  }
  const existingUser = await User.findOne({ where: { id, email } });
  if(!existingUser){
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  // Generar nuevo token
    const token = generateToken(existingUser);

    // Respuesta exitosa
    return res.json({
      success: true,
      user: {
        id: existingUser.id,
        email: existingUser.email
      },
      token,
      expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '7d'
    });
  } catch (error) {
      console.error('Error al generar token de prueba:', error);
      res.status(500).json({ error: 'Error al generar token' });
  }};

// Para registrar un usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación mejorada
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    const newUser = await User.create({
      name,
      email,
      password // El hook en el modelo se encarga del hashing
    });
    const token = generateToken(newUser);

    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({
      message: 'Error en el servidor',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Versión mejorada de loginUser
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password']
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }
    const token = generateToken(user);
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token,
      expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '7d'
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      message: 'Error durante el inicio de sesión',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};