import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Payment } from "../../../../models/payment";

export async function GET(req) {


    try {
        await connectionToDatabase();
        const {searchParams} = new URL(req.url);
        const email = searchParams.get("email");
        //console.log("email", email)
        const orderData = await Payment.find({ email, status: {$ne: "delivered"} })
        //console.log("order data:", orderData)
        return NextResponse.json(orderData, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "some thing went wrong", status: 500 })
    }

}