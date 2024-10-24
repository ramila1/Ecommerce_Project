import express from 'express';
import {
    getUserProfile, 
    logout, 
    updatePassword, 
    updateUser, 
    userController, 
    userLoginController, 
    profilePic,
    passwordResetController} from '../controllers/userController.js';
import { isAuth } from '../middleswares/authMiddleware.js';
import { upload } from '../middleswares/multer.js';

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

//update password
userRouter.put('/update-password',isAuth,updatePassword);

//update profile pic
userRouter.put('/update-profile-pic',isAuth,upload,profilePic);

//forget password
userRouter.post('/reset-password',passwordResetController)

export default userRouter;