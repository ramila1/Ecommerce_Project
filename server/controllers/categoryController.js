import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary';

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
            category
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
                message: 'Category not found',
                success: false
            });
        }
        await res.status(200).send({
            message: "Category fetched successfully",
            success: true,
            category
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
        const { name } = req.body;
        if (!name) {
            return res.status(500).send({
                message: "Category name must have to provide",
                success: false
            });
        }
        const category = await categoryModel.create({
            name
        });
        await category.save();
        res.status(200).send({
            message: "Category created",
            success: true,
            category
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

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(500).send({
                message: "Category not found",
                success: false
            });
        }
        const products = await productModel.find(category = category._id);
        for (let index = 0; index < products.length; index++) {
            const product = products[index]
            product.category = undefined
            await product.save();
        }
        await category.deleteOne();
        await res.status(200).send({
            message: 'Category deleted successfully',
            success: true
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Error while deleting category",
                success: false,
                error,
            });
    }
};
//update category
export const updateCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        const { name } = req.body;
        if (!category) {
            return res.status(500).send({
                message: "Category is not found",
                success: false,
            });
        }
        const products = await productModel.findById(category = category._id);
        for (let index = 0; index < products.length; index++){
            const product = products[index];
            product.category = name;
            await product.save()
        }
        await category.save();
        res.status(200).send({
            message: 'Category updated successfully',
            success: true
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Error while updating category",
                success: false,
                error,
            });
    }
};