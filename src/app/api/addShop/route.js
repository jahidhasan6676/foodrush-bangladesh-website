import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Shop } from "../../../../models/addShop";

export async function POST(req) {
    

    try {
        const body = await req.json();
        //console.log("body", body)
        await connectionToDatabase();

        const shopProduct = await Shop.create(body)
        //console.log("shop product", shopProduct)
        return NextResponse.json({ message: "Shop Save Successfully", data: shopProduct })
    } catch (error) {
        //console.log("Error Saving data", error);
        return NextResponse.json({ message: "Error Saving Shop" }, { status: 500 })
    }
}