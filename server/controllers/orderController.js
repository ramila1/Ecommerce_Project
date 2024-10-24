import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary';
export const getAllOrderController = async(req,res)=>{
    try{
        const order = await orderModel.find*({});
        if(!order){
            return res.status(500).send({
                message:'Order is not found',
                success:false
            });
        }
        await res.status(200).send({
            message:'All orders are fetched',
            success:true,
            order
        })
    }catch(error){
        console.log(error),
        res.status(500).send({
            message:'Error while fetching all order',
            success:false,
            error
        });
    }
};

//fetch single order
export const getSingleOrderController = async(req,res)=>{
    try{
        const order = await orderModel.findById(req.params.id);
        if(!order){
            return res.status(500).send({
                message:'Order is not found',
                success:false
            });
        }
        await res.status(200).send({
            message:'Order found',
            success:true
        });

    }catch(error){
        console.log(error);
        if(error.name === "CastError"){
            return res.status(404).send({
                message:'Invalid Id',
                success:false
            });
        }
        res.status(500).send({
            message:"Error while fetching order",
            success:false,
            error
        });
    }
}

//create order 
export const createOrderController = async(req,res)=>{
    try{
        const {shipping_information,
            order_products,
            payment_method,
            payment_info,
            item_name,
            item_price,
            item_tax,
            item_shipping_cost,
            items_total_amount,
            order_status} = req.body;
        // if(!shipping_information || !order_products || !payment_method || !payment_info || !item_name ||!item_price
        //     || !item_tax || !item_shipping_cost || !items_total_amount || !order_status){
        //     return res.status(500).send({
        //         message:'All field must have to provided',
        //         success:false
        //     });
        // }
        const order = await orderModel.create({
            user:req.user._id,
            shipping_information,
            order_products,
            payment_method,
            payment_info,
            item_name,
            item_price,
            item_tax,
            item_shipping_cost,
            items_total_amount,
            order_status

        });
        for(let index = 0;index<order_products.length;index++){
            const product = await productModel.findById(order_products[i].product)
            product.stock -= order_products[i].quantity;
            await product.save();
        }
        await res.status(200).send({
            message:'Order created',
            success:true,
            order

        });
     

    }catch(error){
        console.log(error),
        res.status(500).send({
            message:'Error while creating order',
            success:false,
            error,
        });
    }
};