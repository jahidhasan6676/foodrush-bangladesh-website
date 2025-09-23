import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { VendorForm } from "../../../../models/VendorForm";


export async function GET(req) {
    
    try{
        await connectionToDatabase();

        const vendorFom = await VendorForm.find();
        //console.log("see member form", vendorFom)
        return NextResponse.json(vendorFom, {status: 200})
    }catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500})
    }
    
}