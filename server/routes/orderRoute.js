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

orderRouter.get(
  "/get-single-order/:id",
  isAuth,
  upload,
  getSingleOrderController
);

orderRouter.post("/create-order", isAuth, createOrderController);

orderRouter.post("/payment", isAuth, paymentController);

orderRouter.get(
  "/admin/get-all-orders",
  isAuth,
  isAdmin,
  getAllOrderController
);

orderRouter.put(
  "/admin/order-status/:id",
  isAuth,
  isAdmin,
  orderStatusController
);
orderRouter.get("/user/user-all-orders", isAuth, getUserOrderController);

export default orderRouter;
