import orderModel from "../models/orderModel.js";
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