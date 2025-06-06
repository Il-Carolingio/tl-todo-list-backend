// taskRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { 
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, createTask);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;