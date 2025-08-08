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
    },
    owner: {
      name: { type: String },
      email: { type: String },
      image: { type: String }
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)