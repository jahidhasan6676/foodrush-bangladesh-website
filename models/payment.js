import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cartIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cart",
            },
        ],
        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        transactionId: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["Pending", "success", "failed"],
            default: "Pending",
        },
        deliveryInfo: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            location: { type: String, required: true },
        },
        method: {
            type: String,
            enum: ["SSLCommerce", "CashOnDelivery", "Other"],
            default: "SSLCommerce",
        },
        payment: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema)
