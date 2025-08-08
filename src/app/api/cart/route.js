import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Cart } from "../../../../models/addCart";

export async function POST(req) {
    

    try {
        await connectionToDatabase();

        const cart = await req.json();
        //console.log("cart", cart)

        if (!cart?.productId || !cart?.ownerEmail || !cart?.customerEmail) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await Cart.create(cart)
        //console.log("result", result)
        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to add to cart" }, { status: 500 })
    }

}