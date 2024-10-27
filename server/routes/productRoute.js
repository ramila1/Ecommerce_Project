import express from "express";
import {
  getAllProductController,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteImage,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuth, isAdmin } from "../middleswares/authMiddleware.js";
import { upload } from "../middleswares/multer.js";
export const productRouter = express.Router();

//get all product
productRouter.get("/getall-product", getAllProductController);

//get single product
productRouter.get("/get-single-product/:id", isAuth, getSingleProduct);

//make product
productRouter.post("/create-product", isAuth, isAdmin, upload, createProduct);

//update product
productRouter.put(
  "/update-product/:id",
  isAuth,
  isAdmin,
  upload,
  updateProduct
);

//delete  product image
productRouter.delete("/delete-image/:id", isAuth, isAdmin, deleteImage);

//deleet product
productRouter.delete("/delete-product/:id", isAuth, isAdmin, deleteProduct);

export default productRouter;
