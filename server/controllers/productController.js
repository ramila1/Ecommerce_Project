import productModel from "../models/productModel.js";

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

