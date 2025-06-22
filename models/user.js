import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    role: {type: String, enum: ["customer", "vendor", "admin"], default: "customer"},
    providerAccountId: {type: String},
    provider: {type: String},
    
    

},
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;