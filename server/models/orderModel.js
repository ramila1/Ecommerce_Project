import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shipping_information: {
      address: {
        type: String,
        required: [true, "Address name is required"],
      },
      city: {
        type: String,
        required: [true, "City name is required"],
      },
      country: {
        type: String,
        required: [true, "Country name is required"],
      },
    },
    order_products: [
      {
        name: {
          type: String,
          required: [true, "Product name is required"],
        },
        price: {
          type: Number,
          required: [true, "Product price is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quatity is required"],
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: [true, "Product is required"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user is required"],
    },
    payment_method: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    Paid: Date,
    payment_info: {
      id: String,
      status: String,
    },

    item_name: {
      type: String,
      require: [true, "item name is required"],
    },
    item_price: {
      type: String,
      require: [true, "item price is required"],
    },
    item_tax: {
      type: Number,
      require: [false, "item tax is required"],
    },
    item_shipping_cost: {
      type: Number,
      required: [false, "Shipping cost is required"],
    },
    items_total_amount: {
      type: Number,
      required: [true, "Total Amount is required"],
    },
    order_status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
    Delivered_at: Date,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
