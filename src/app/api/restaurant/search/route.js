// search/route.js
import { NextResponse } from "next/server";
import { Shop } from "../../../../../models/addShop";
import connectionToDatabase from "../../../../../lib/db";


export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");

        const result = await Shop.find({
            shopStatus: "approved",
            $or: [
                { location: { $regex: location, $options: "i" } },
                { address: { $regex: location, $options: "i" } },
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