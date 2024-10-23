import express from 'express';
import { getAllProductController,getSingleProduct,createProduct, updateProduct } from '../controllers/productController.js';
import { isAuth } from '../middleswares/authMiddleware.js';
import { upload } from '../middleswares/multer.js';
export const productRouter = express.Router();

productRouter.get('/getall-product',getAllProductController);

productRouter.get('/get-single-product/:id',getSingleProduct);

productRouter.post('/create-product',isAuth,upload,createProduct);

productRouter.put('/update/:id',isAuth,updateProduct);

export default productRouter;