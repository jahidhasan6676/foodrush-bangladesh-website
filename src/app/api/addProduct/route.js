import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Product } from "../../../../models/addProduct";

export async function POST(req) {
    try {
        const body = await req.json();
        //console.log("body", body)
        await connectionToDatabase();

        const addProduct = await Product.create(body)
        return NextResponse.json({ message: "Product Save Successfully", data: addProduct })
    }catch(error){
        console.log("Error Saving data", error);
        return NextResponse.json({message: "Error Saving Data"}, {status: 500})
    }
}