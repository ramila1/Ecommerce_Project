import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//admin middleware
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      message: "admin only",
      success: false,
    });
  }
  next();
};

export const isAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get the token from headers
  if (!token) {
    return res.status(401).send({
      message: "UnAuthorized User",
      success: false,
    });
  }
  try {
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    if (!req.user) {
      return res
        .status(401)
        .send({ message: "UnAuthorized User", success: false });
    }
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token", success: false });
  }
};
