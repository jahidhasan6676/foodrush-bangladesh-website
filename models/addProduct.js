import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
     {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: String, 
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    photo: {
      type: String, 
      required: true,
    },
    status: {
        type: String,
        default: "pending"
    }
  },
  {
    timestamps: true, 
  }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)