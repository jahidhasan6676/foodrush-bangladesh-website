import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Payment } from "../../../../../models/payment";

export async function PATCH(req, { params }) {
    try {
        await connectionToDatabase();

        const { statusUpdate } = await req.json();
        const { id } = await params;
        //console.log("status", statusUpdate)
        //console.log("id", id)

        const updatedOrder = await Payment.findByIdAndUpdate(
             id,
            { status: statusUpdate },
            { new: true }
        );

        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "something went wrong", status: 500 })
    }

}