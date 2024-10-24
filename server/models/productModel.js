import mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is REquired']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
        required: [true, 'description is require']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    stock: {
        type: Number,
        required: [true, 'product stock is required']
    },

    images: [
        {
            public_id: String,
            url: String
        }
    ],

}, { timestamps: true });

export const productModel = mongoose.model("Products", productSchema);
export default productModel;