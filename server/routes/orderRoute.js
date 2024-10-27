import express from "express";
import { isAdmin, isAuth } from "../middleswares/authMiddleware.js";
import {
  createOrderController,
  getAllOrderController,
  getSingleOrderController,
  paymentController,
  orderStatusController,
  getUserOrderController,
} from "../controllers/orderController.js";
import { upload } from "../middleswares/multer.js";

const orderRouter = express.Router();

//get single order
orderRouter.get(
  "/get-single-order/:id",
  isAuth,
  upload,
  getSingleOrderController
);

//create order
orderRouter.post("/create-order", isAuth, createOrderController);

//make payment
orderRouter.post("/payment", isAuth, paymentController);

//get all orders
orderRouter.get(
  "/admin/get-all-orders",
  isAuth,
  isAdmin,
  getAllOrderController
);

//update order
orderRouter.put(
  "/admin/order-status/:id",
  isAuth,
  isAdmin,
  orderStatusController
);

//get own all orders
orderRouter.get("/user/user-all-orders", isAuth, getUserOrderController);

export default orderRouter;
