import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../../lib/db"
import { Product } from "../../../../../../models/addProduct";

export async function GET(req, {params}){
    try{
        await connectionToDatabase();

        const {id} = await params;

        const product = await Product.findById(id).lean();
        //console.log("single Product", product)
        return NextResponse.json(product, {status: 200})

    }catch(error){
        //console.log(error)
        return NextResponse.json({message: "Single Product not found"}, {status: 500})
    }
}