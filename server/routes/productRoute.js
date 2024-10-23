import express from 'express';
import { getAllProductController } from '../controllers/productController.js';
export const productRouter = express.Router();

productRouter.get('/getall-product',getAllProductController);

productRouter.get('/get-product/:id',()=>{});

export default productRouter;