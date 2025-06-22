import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env.local file');
}
let cached = global.mongoose || { conn: null, promise: null };

const connectionToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    console.log("MongoDB Connected Successfully!");
    return cached.conn;

}
export default connectionToDatabase;