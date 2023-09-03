import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController';
import { authenticate } from '../middleware/authentication';

const router = express.Router();

// Configure as rotas de usuário aqui
router.post('/', authenticate, createUser);
router.get('/', authenticate, getUsers);
router.patch('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
