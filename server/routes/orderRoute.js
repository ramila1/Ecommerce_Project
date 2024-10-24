import express from 'express';
import { isAdmin, isAuth } from '../middleswares/authMiddleware.js';
import { createOrderController, getAllOrderController, getSingleOrderController ,paymentController} from '../controllers/orderController.js';
import { upload } from '../middleswares/multer.js';

const orderRouter = express.Router();

orderRouter.get('/get-all-order',isAuth,upload,getAllOrderController);

orderRouter.get('/get-single-order/:id',isAuth,upload,getSingleOrderController);

orderRouter.post('/create-order',isAuth,upload,createOrderController);

orderRouter.post('/payment',isAuth,paymentController);

orderRouter.get('/admin/get-all-orders',isAuth,isAdmin,getAllOrderController);


export default orderRouter;