import express from 'express';
import {getUserProfile, logout, userController, userLoginController} from '../controllers/userController.js';
import { isAuth } from '../middleswares/authMiddleware.js';

const userRouter = express.Router();

//register
userRouter.post('/register',userController);

//login
userRouter.post('/login',userLoginController);

//profile
userRouter.get('/profile',isAuth,getUserProfile);

//logout
userRouter.get('/logout',logout);
export default userRouter;