import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(500).send({
        message: "Category Not Found",
        success: false,
      });
    }
    await res.status(200).send({
      message: "Fetch All Category",
      success: true,
      total_category: category.length,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "Error while festching all category",
        success: false,
        error,
      });
  }
};

//get one category
export const getOneCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(500).send({
        message: "Category not found",
        success: false,
      });
    }
    await res.status(200).send({
      message: "Category fetched successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "Error while fetching single category",
        success: false,
        error,
      });
  }
};

//create category
export const createCategoryController = async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).send({
        message: "Category name must have to provide",
        success: false,
      });
    }
    const existingCategory = await categoryModel.findOne({ category_name });
    if (existingCategory) {
      return res.status(500).send({
        success: false,
        message: "Category already exist",
      });
    }

    const category = await new categoryModel({
      category_name,
      slug: slugify(category_name),
    }).save();

    res.status(200).send({
      message: "Category created",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "Error while creating category",
        success: false,
        error,
      });
  }
};
// Delete category controller
export const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }

    const deletedProducts = await productModel.deleteMany({
      category: category._id,
    });

    if (deletedProducts.deletedCount > 0) {
      console.log(`${deletedProducts.deletedCount} products deleted.`);
    } else {
      console.log("No products were found for this category.");
    }

    await category.deleteOne();

    res.status(200).send({
      message: "Category and associated products deleted successfully",
      success: true,
      deletedCount: deletedProducts.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send({
      message: "Error while deleting category",
      success: false,
      error: error.message || error,
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(500).send({
        message: "Category is not found",
        success: false,
      });
    }
    const { updatedCategory } = req.body;
    const products = productModel.findById({ category: category._id });
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      product.category = updatedCategory;
      await product.save();
    }
    if (updatedCategory) category.category_name = updatedCategory;
    await category.save();
    res.status(200).send({
      message: "Category updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(500).send({
        message: "Invalis Id",
        success: false,
      });
    }
    res.status(500).send({
      message: "Error while updating category",
      success: false,
      error,
    });
  }
};

//get all products on the basis of category
export const getCategoryProductsController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res
        .status(500)
        .send({ success: false, message: "Category not found" });
    }

    const products = await productModel.find({ category: categoryId });

    res.status(200).send({ success: true, category: category.name, products });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching products for the category",
    });
  }
};
