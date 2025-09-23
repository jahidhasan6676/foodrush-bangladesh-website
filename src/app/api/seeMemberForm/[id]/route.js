import NextAuth from "next-auth";
import connectionToDatabase from "../../../../../lib/db";
import User from "../../../../../models/user";
import { VendorForm } from "../../../../../models/VendorForm";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}) {
    try{
        await connectionToDatabase();
        const {id} = await params;

        const getVendorRequestForm = await VendorForm.findById(id);
        const email = getVendorRequestForm.email;
        
        // customer role update
        const roleUpdate = await User.updateOne({email: email},{$set: {role: "vendor"}});

        // request form status update
        const statusUpdate = await VendorForm.updateOne({_id: id},{$set: {status: "approve"}})

        console.log("role update:", roleUpdate, "status update:", statusUpdate);

        return NextResponse.json({roleUpdate, statusUpdate}, {status: 200})

    }catch(error){
        return NextResponse.json({message: "something went wrong"}, {status: 500})
    }
}