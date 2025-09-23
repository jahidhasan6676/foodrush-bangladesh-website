const { default: mongoose } = require("mongoose");



const vendorFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        shopName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    }


)
export const VendorForm = mongoose.models.VendorForm || mongoose.model("VendorForm", vendorFormSchema)