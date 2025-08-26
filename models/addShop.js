import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    discount: {
      type: Number,
      default: 0,
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
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    shopPhoto: {
      type: String,
      required: true,
    },

    shopStatus: {
      type: String,
      default: "Pending"
    },

    ownerInfo: {
      name: { type: String },
      email: { type: String },
      image: { type: String }
    },
  },
  {
    timestamps: true,
  }
);

export const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema)