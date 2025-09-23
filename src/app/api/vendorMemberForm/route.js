import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { VendorForm } from "../../../../models/VendorForm";

export async function POST(req) {
    await connectionToDatabase();

    try{
        const body = await req.json();

        const addVendorForm = await VendorForm.create(body);

        return NextResponse.json({message: "Vendor Member Form Send", data: addVendorForm})

    }catch(error){
        return NextResponse.json({message: "Something Went Wrong"}, {status: 500})
    }
}