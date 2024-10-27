import express from "express";
import {
  createCategoryController,
  getAllCategoryController,
  getOneCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryProductsController,
} from "../controllers/categoryController.js";
import { isAuth, isAdmin } from "../middleswares/authMiddleware.js";

const categoryRouter = express.Router();

//get all category
categoryRouter.get("/get-all-category", getAllCategoryController);

//get single category
categoryRouter.get("/get-one-category/:id", isAuth, getOneCategoryController);

//create category
categoryRouter.post(
  "/create-category",
  isAuth,
  isAdmin,
  createCategoryController
);

//delete category
categoryRouter.delete(
  "/delete-category/:id",
  isAuth,
  isAdmin,
  deleteCategoryController
);

//update category
categoryRouter.put(
  "/update-category/:id",
  isAuth,
  isAdmin,
  updateCategoryController
);

//fetch all product on the basis of category
categoryRouter.get(
  "/get-category-products/:id",
  isAuth,
  getCategoryProductsController
);
export default categoryRouter;
