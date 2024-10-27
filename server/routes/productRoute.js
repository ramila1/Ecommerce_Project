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

productRouter.get("/getall-product", getAllProductController);

productRouter.get("/get-single-product/:id", isAuth, getSingleProduct);

productRouter.post("/create-product", isAuth, isAdmin, upload, createProduct);

productRouter.put(
  "/update-product/:id",
  isAuth,
  isAdmin,
  upload,
  updateProduct
);

productRouter.delete("/delete-image/:id", isAuth, isAdmin, deleteImage);

productRouter.delete("/delete-product/:id", isAuth, isAdmin, deleteProduct);

export default productRouter;
