
import { NextResponse } from "next/server";
import { Product } from "../../../../models/addProduct";
import connectionToDatabase from "../../../../lib/db";

export async function GET(req, {params}) {
    try{
        await connectionToDatabase();
        const email = params.email;
        console.log("email", email)
        
        const result = await Product.find({"owner.email": email});
        console.log("result", result)
        return NextResponse.json(result, {status: 200})
    }catch(error){
        // console.log(error)
        return NextResponse.json({message: "something went wrong", status: 500})
    }
}