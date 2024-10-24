import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    shippingInformation:{
        address:{
            type:String,
            required:[true,'Address name is required']
        },
        city:{
            type:String,
            required:[true,'City name is required']
        },
        country:{
            type:String,
            required:[true,'Country name is required']
        }
    },
    order_product_info:[
        {
        product_name:{
            type:String,
            required:[true,'Product name is required']
        },
        product_price:{
            type:String,
            required:[true,'Product price is required']
        },
        product_quantity:{
            type:String,
            required:[true,'Product quatity is required']
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products",
            required:[true,'Product is required']

        }
    }

    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:[true,'user is required']
        
    },
    payment_method:{
        type:String,
        enum:["COD","ONLINE"],
        default:"COD"
    },
    Paid:Date,
    payment_Info:{
        id:String,
        status:String

    },
    
    item_name:{
        type:String,
        require:[true,'item name is required']
    },
    item_price:{
        type:String,
        require:[true,'item price is required']
    },
    item_tax:{
        type:String,
        require:[true,'item tax is required'],
    },
    item_shipping_cost:{
        type:String,
        required:[true,'Shipping cost is required']
    },
    items_total_amount :{
        type: String,
        required:[type,'Total Amount is required']
    },
    order_status:{
        type:String,
        enum :['processing','shipped','delivered'],
        default:'processing'
    },
    Delivered_at:Date,

    
},{timestamps:true})

export const orderModel = mongoose.model("Order",orderSchema);
export default orderModel