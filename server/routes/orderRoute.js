import express from 'express';
import { isAuth } from '../middleswares/authMiddleware.js';
import { createOrderController, getAllOrderController, getSingleOrderController } from '../controllers/orderController.js';
import { upload } from '../middleswares/multer.js';

const orderRouter = express.Router();

orderRouter.get('/get-all-order',isAuth,upload,getAllOrderController);

orderRouter.get('/get-single-order',isAuth,upload,getSingleOrderController);

orderRouter.post('/create-order',isAuth,upload,createOrderController);

export default orderRouter;