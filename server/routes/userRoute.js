import express from "express";
import {
  getUserProfile,
  logout,
  updatePassword,
  updateUser,
  userController,
  userLoginController,
  profilePic,
  passwordResetController,
  getAllUserController,
  getSingleUser,
  updateOtherUser,
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../middleswares/authMiddleware.js";
import { upload } from "../middleswares/multer.js";

const userRouter = express.Router();

//register
userRouter.post("/register", upload, userController);

//login
userRouter.post("/login", userLoginController);

//profile
userRouter.get("/profile", isAuth, getUserProfile);

//logout
userRouter.get("/logout", isAuth, logout);

//update
userRouter.put("/update-user", isAuth, updateUser);

//update password
userRouter.put("/update-password", isAuth, updatePassword);

//update profile pic
userRouter.put("/update-profile-pic", isAuth, upload, profilePic);

//forget password
userRouter.put("/reset-password", passwordResetController);

userRouter.get("/get-all-users", isAuth, isAdmin, getAllUserController);

userRouter.get("/get-single-user/:id", isAuth, getSingleUser);

userRouter.put("/update-other-user/:id", isAuth, upload, updateOtherUser);

//protect-route
userRouter.get("/user-auth", isAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

userRouter.get("/admin-auth", isAuth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default userRouter;
