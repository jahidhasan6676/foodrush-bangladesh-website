import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  ownerEmail: { type: String, required: true },
  customerEmail: { type: String, required: true },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema)
