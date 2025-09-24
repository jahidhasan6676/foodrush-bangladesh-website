import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Shop } from "../../../../../models/addShop";

export async function GET(req) {
    try {
        await connectionToDatabase();

        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        if (!email) {
            return NextResponse.json({ error: "email required" }, { status: 400 });
        }

        const shop = await Shop.findOne({ "ownerInfo.email": email })
        if (!shop) {
            return NextResponse.json({ error: "Shop not found" }, { status: 404 });
        }

        return NextResponse.json({shopId: shop._id})


    } catch (err) {
        return NextResponse.json({ message: "shopId not found" }, { status: 500 })
    }

}