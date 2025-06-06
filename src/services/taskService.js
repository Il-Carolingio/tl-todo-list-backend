const { Task } = require('../models');
const { Op } = require('sequelize');

// Servicio para obtener tareas con filtros
const getTasks = async (userId, filters = {}) => {
  const { completed, search } = filters;
  const whereClause = { userId }; // Filtra por usuario

  if (completed === 'true' || completed === 'false') {
    whereClause.completed = completed === 'true';
  }

  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } }, // iLike: case-insensitive (depende del DB)
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  return await Task.findAll({
    where: whereClause,
    order: [['createdAt', 'DESC']], // Ordena por fecha descendente
  });
};

// Servicio para crear una tarea
const createTask = async (userId, taskData) => {
  return await Task.create({
    ...taskData,
    userId, // Asigna automáticamente el userId
  });
};

// Servicio para actualizar una tarea (con validación de propiedad)
const updateTask = async (userId, taskId, updates) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error('Task not found or unauthorized');
  
  return await task.update(updates);
};

// Servicio para eliminar una tarea (con validación de propiedad)
const deleteTask = async (userId, taskId) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error('Task not found or unauthorized');
  
  await task.destroy();
  return { message: 'Task deleted successfully' };
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};