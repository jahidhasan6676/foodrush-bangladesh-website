// search/route.js
import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Product } from "../../../../../models/addProduct";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");

        const result = await Product.find({
            status: "approved",
            $or: [
                { division: { $regex: location, $options: "i" } },
                { district: { $regex: location, $options: "i" } },
                { area: { $regex: location, $options: "i" } },
            ],
        })

        return NextResponse.json(result);

    } catch (error) {
        console.log("Error in search API:", error);
        return NextResponse.json({
            message: "search failed",
            error: error.message
        }, { status: 500 });
    }
}