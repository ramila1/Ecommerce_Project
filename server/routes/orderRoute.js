import express from 'express';
import { isAuth } from '../middleswares/authMiddleware.js';
import { getAllOrderController } from '../controllers/orderController.js';
import { upload } from '../middleswares/multer.js';

const orderRouter = express.Router();

orderRouter.get('/get-all-order',isAuth,upload,getAllOrderController);

export default orderRouter;