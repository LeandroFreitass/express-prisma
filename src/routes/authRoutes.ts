import express from 'express';
import { register, login, logout } from '../controllers/authController';

const router = express.Router();

// Configure as rotas de autenticação aqui
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
export default router;
