import express from 'express';
import {getUserProfile, logout, updateUser, userController, userLoginController} from '../controllers/userController.js';
import { isAuth } from '../middleswares/authMiddleware.js';

const userRouter = express.Router();

//register
userRouter.post('/register',userController);

//login
userRouter.post('/login',userLoginController);

//profile
userRouter.get('/profile',isAuth,getUserProfile);

//logout
userRouter.get('/logout',isAuth,logout);

//update
userRouter.put('/update',isAuth,updateUser);
export default userRouter;