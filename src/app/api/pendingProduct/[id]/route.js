import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Product } from "../../../../../models/addProduct";

export async function PATCH(req, {params}){
    try{
        await connectionToDatabase();
        const {id} = await params;
        const {status} = await req.json();
        //console.log("id", id)
        //console.log("status", status)

        const statusUpdate = await Product.findByIdAndUpdate(id, {status}, {new: true});
        //console.log("product id", statusUpdate)
        return NextResponse.json({message: "status updated", product: statusUpdate})

    }catch(error){
         //console.log(error)
        return NextResponse.json({message: "Failed status update"}, {status: 500})
    }
}