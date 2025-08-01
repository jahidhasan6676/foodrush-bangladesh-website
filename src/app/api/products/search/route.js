import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db"
import { Product } from "../../../../../models/addProduct";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const location = searchParams.get("location");
        console.log("location", location)
        const result = await Product.find({
            status: "approved",
            $or: [
                { division: { $regex: location, $options: "i" } },
                { district: { $regex: location, $options: "i" } },
                { area: { $regex: location, $options: "i" } },
            ],
        })
        console.log("result", result)
        return NextResponse.json(result)

    } catch (error) {
        //console.log(error)
        return NextResponse.json({ message: "search failed" }, { status: 500 })
    }
}