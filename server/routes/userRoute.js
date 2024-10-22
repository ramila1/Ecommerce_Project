import express from 'express';
import {getUserProfile, userController, userLoginController} from '../controllers/userController.js';
import { isAuth } from '../middleswares/authMiddleware.js';

const userRouter = express.Router();

//register
userRouter.post('/register',userController);

//login
userRouter.post('/login',userLoginController);

//profile

userRouter.get('/profile',isAuth,getUserProfile);

export default userRouter;