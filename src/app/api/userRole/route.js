import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";

export async function GET(req){
    try{
        await connectionToDatabase();
    // receive params from frontend
    const {searchParams} = new URL(req.url);
    const email = searchParams.get("email");

    if(!email){
        return NextResponse.json({message: "Email is required"}, {status: 400})
    }

    const user = await User.findOne({email}).select("role");

    if(!user){
        NextResponse.json({message: "User Not Found"}, {status: 404})
    }
    return NextResponse.json({role: user.role}, {status: 200})
    }catch(error){
        return NextResponse.json({message: "User role not found"})
    }
}