import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";

export async function GET(req){
   
        await connectionToDatabase();
        const url = new URL(req.url);
        const adminEmail = url.searchParams.get("adminEmail");

     try{
        const users = await User.find({email: {$ne: adminEmail}});
        return NextResponse.json(users, {status: 200})

    }catch(error){
        return NextResponse.json({message: "Server Error"}, {status: 500})
    }

}