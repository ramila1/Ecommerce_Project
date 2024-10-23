import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary';

export const getAllProductController = async(req,res)=>{
    try{
        const products = await productModel.find({});
        res.status(200).send({
            message:"All product is fetched",
            succes:true,
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Error during fetch product",
            success:false,
            error,
        });
    }
};

//fetch single product

export const getSingleProduct = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).send({
                message:"Product is not found",
                success:false
            });
        }

        res.status(200).send({
            message:'Product fetch successfully',
            success:true,
            product
        });
    }catch(error){
        console.log(error);
        if(error.name === "CastError"){
            return res.status(500).send({
                message:"Invalid Id",
                success:false
            });
        }
        res.status(500).send({
            message:"Error during fetching single product",
            success:false,
            error,
        });
    }
};

//create product
export const createProduct = async(req,res)=>{
    try{
        const {name,category,description,price,stock} = req.body;
        // if(!name || !category || !description || !price || !stock){
        //     return res.status(500).send({
        //         message:"All fields must have to provide.",
        //         success:false
        //     });

        // }
        if(!req.file){
            return res.status(500).send({
                message:"File not found",
                success:false
            });
        }
        const file = getDataUri(req.file)

        const cloudinary_data = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id : cloudinary_data.public_id,
            url : cloudinary_data.url,
        }

        await productModel.create({
            name,
            category,
            description,
            price,
            stock,
            images:image,
        });

        res.status(200).send({
            message:"Product created",
            success:true
        });

    }catch(error){
        console.log(error),
        res.status(500).send({
            message:"Error while creating product",
            success:false,
            error,
        });
    }
};

//update product
export const updateProduct = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        const {name,category,description,price,stock} = req.body;

        if(!product){
            return res.status(500).send({
                message:"Product not found",
                success:false
            });
        }


        if(name) product.name = name
        if(category) product.category = category
        if(description) product.description = description
        if(price) product.price = price
        if(stock) product.stock = stock

        await product.save();
        res.status(200).send({
            message:"Product update successfully",
            success:true,
            product,
        });
    
    }catch(error){
        console.log(error),
        res.status(500).send({
            message:"Update error",
            success:false,
            error,
        });
    }
};

//update product image
export const updateProductImage = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(500).send({
                message:"Product is not found",
                success:false
            });
        }
        const file = getDataUri(req.file);
        const delImage = await cloudinary.v2.uploader.destroy(product.images.public_id);
        const cloudinary_data = await cloudinary.v2.uploader.upload(file.content);
        product.images = {
            public_id : cloudinary_data.public_id,
            url : cloudinary_data.url
        }

        await product.save();
        res.status(200).send({
            message:"Update product image successfully",
            success:true,
            product
        });

    }catch(error){
        console.log(error),
        res.status(500).send({
            message:"Update product image error",
            success:false,
            error,
        });
    }
};