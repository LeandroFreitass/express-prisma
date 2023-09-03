import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// Configure as rotas de autenticação aqui
router.post('/register', register);
router.post('/login', login);

export default router;
