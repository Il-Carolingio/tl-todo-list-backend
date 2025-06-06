import app from './src/app.js';
import { sequelize } from './src/models/index.js';

const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos antes de iniciar
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });