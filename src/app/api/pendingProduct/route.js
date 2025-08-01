import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db"
import { Product } from "../../../../models/addProduct";

export async function GET(){
    try{
        await connectionToDatabase();
        const allPendingProduct = await Product.find({status: "pending"});
        // console.log("pending product", allPendingProduct)
        return NextResponse.json(allPendingProduct, {status: 200})
        
    }catch(error){
        console.log(error)
        NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}