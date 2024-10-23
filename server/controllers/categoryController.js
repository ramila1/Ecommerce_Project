import categoryModel from "../models/categoryModel.js";
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

//create category 
export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(500).send({
                message:"Category name must have to provide",
                success:false
            });
        }
        const category = await categoryModel.create({
            name
        });
        await category.save();
        res.status(200).send({
            message:"Category created",
            success:true,
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