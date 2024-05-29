import {Router} from 'express'
import { getProfile, login, logout, register } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes and methods 
router.post('/register' , register);
router.post('/login' , login);
router.get('/logout' , logout);
// Middleware op
router.get('/me' , isLoggedIn , getProfile);



export default router;
