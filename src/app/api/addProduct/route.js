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

export async function GET(req){
    try{
        await connectionToDatabase();
        const {searchParams} = new URL(req.url);
        //console.log("params", searchParams)
        const email = searchParams.get("email");
        //console.log("email:", email)
        if(!email){
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
        
        const allProductData = await Product.find({"ownerInfo.email": email }).lean();
        return NextResponse.json(allProductData, {status: 200})
    }catch(error){
        console.log(error);
        return NextResponse.json(error,{status: 500});
    }
}