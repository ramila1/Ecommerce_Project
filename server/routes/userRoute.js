import express from 'express';
import {userController, userLoginController} from '../controllers/userController.js';

const userRouter = express.Router();

//register
userRouter.post('/register',userController);

//login
userRouter.get('/login',userLoginController);

export default userRouter;