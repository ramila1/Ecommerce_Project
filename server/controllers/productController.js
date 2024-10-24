import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary';

export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).send({
            message: "All product is fetched",
            succes: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error during fetch product",
            success: false,
            error,
        });
    }
};

//fetch single product

export const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send({
                message: "Product is not found",
                success: false
            });
        }

        res.status(200).send({
            message: 'Product fetch successfully',
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(500).send({
                message: "Invalid Id",
                success: false
            });
        }
        res.status(500).send({
            message: "Error during fetching single product",
            success: false,
            error,
        });
    }
};

//create product
export const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, stock } = req.body;
        if (!req.file) {
            return res.status(500).send({
                message: "File not found",
                success: false
            });
        }
        const file = getDataUri(req.file)

        const cloudinary_data = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cloudinary_data.public_id,
            url: cloudinary_data.url,
        }

        await productModel.create({
            name,
            category,
            description,
            price,
            stock,
            images: [image],
        });

        res.status(200).send({
            message: "Product created",
            success: true
        });

    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Error while creating product",
                success: false,
                error,
            });
    }
};

//update product
export const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        const { name, category, description, price, stock } = req.body;

        if (!product) {
            return res.status(500).send({
                message: "Product not found",
                success: false
            });
        }


        if (name) product.name = name
        if (category) product.category = category
        if (description) product.description = description
        if (price) product.price = price
        if (stock) product.stock = stock

        await product.save();
        res.status(200).send({
            message: "Product update successfully",
            success: true,
            product,
        });

    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Update error",
                success: false,
                error,
            });
    }
};

//update product image
export const updateProductImage = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(500).send({
                message: "Product is not found",
                success: false
            });
        }
        if (!req.file) {
            return res.status(500).send({
                message: "Product image is not fould",
                success: false
            });
        }
        const file = getDataUri(req.file);
        const cloudinary_data = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cloudinary_data.public_id,
            url: cloudinary_data.url
        }

        product.images.push(image)
        await product.save();
        res.status(200).send({
            message: "Update product image successfully",
            success: true,
            product
        });

    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Update product image error",
                success: false,
                error,
            });
    }
};

// delete product image
export const deleteImage = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(500).send({
                message: "Product image is not found",
                success: false
            });
        }
        const id = req.query.id;
        if (!id) {
            return res.status(500).send({
                message: "Image Id not found",
                success: false
            });
        }
        let isExist = -1;
        product.images.forEach((item, index) => {
            if (item._id.toString() === id.toString()) isExist = index;
        });

        if (isExist < 0) {
            return res.status(500).send({
                message: "Image is not found",
                success: false
            });
        }
        await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
        product.images.splice(isExist, 1);
        await product.save();

        return res.status(200).send({
            message: "Product delete successfully",
            success: true
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Error while delete image",
                success: false,
                error,
            });
    }
};

//delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(500).send({
                message: "Product is not found",
                success: false
            });

        }
        for (let index = 0; index < product.images.length; index++)
            await cloudinary.v2.uploader.destroy(product.images[index].public_id);

        await product.deleteOne();
        res.status(200).send({
            message: "Delete product successfully",
            success: true
        });


    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "Error while deleting product",
                success: false,
                error,
            });
    }
};