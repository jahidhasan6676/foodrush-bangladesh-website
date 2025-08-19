// search/route.js
import { NextResponse } from "next/server";
import { Shop } from "../../../../../models/addShop";
import connectionToDatabase from "../../../../../lib/db";


export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");
        const keywords = location.split(/[\s,]+/); // ["Dhaka", "District", "Dhaka"]

        const regexes = keywords.map(word => new RegExp(word, "i"));

        const result = await Shop.find({
            shopStatus: "approved",
            $or: [
                { location: { $in: regexes } },
                { address: { $in: regexes } },
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