import express from 'express';
import { getAllProductController,getSingleProduct,createProduct, updateProduct,updateProductImage, deleteImage,deleteProduct } from '../controllers/productController.js';
import { isAuth ,isAdmin} from '../middleswares/authMiddleware.js';
import { upload } from '../middleswares/multer.js';
export const productRouter = express.Router();

productRouter.get('/getall-product',getAllProductController);

productRouter.get('/get-single-product/:id',getSingleProduct);

productRouter.post('/create-product',isAuth,isAdmin,upload,createProduct);

productRouter.put('/update/:id',isAuth,isAdmin,updateProduct);

productRouter.put('/update-image/:id',isAuth,isAdmin,upload,updateProductImage);

productRouter.delete('/delete-image/:id',isAuth,isAdmin,deleteImage);

productRouter.delete('/delete-product/:id',isAuth,isAdmin,deleteProduct);

export default productRouter;