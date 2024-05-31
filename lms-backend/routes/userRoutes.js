import {Router} from 'express'
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// Routes and methods 
// Ham yaha single file upload kar rhe hai jismai data ka key avatar hai
router.post('/register' , upload.single("avatar") , register);
router.post('/login' , login);
router.get('/logout' , logout);
// Middleware op
router.get('/me' , isLoggedIn , getProfile);
router.post('/reset' , forgotPassword);
router.post('/reset/:resetToken' , resetPassword);

router.post('/change-password' , isLoggedIn , changePassword)
router.put('/update/:id' , isLoggedIn , upload.single("avatar") , updateUser)






export default router;
