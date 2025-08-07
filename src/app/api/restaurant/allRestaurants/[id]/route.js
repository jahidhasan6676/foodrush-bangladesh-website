import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../../lib/db"
import { Shop } from "../../../../../../models/addShop";

export async function GET(req, {params}) {
    try{
        await connectionToDatabase();
        const {id} = await params;

        const singleShop = await Shop.findById(id).lean();
        //console.log("single shop", singleShop)
        return NextResponse.json(singleShop, {status: 200})

    }catch(error){
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
    
}