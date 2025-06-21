import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectionToDatabase();
       await User.create({name, email, password: hashedPassword});

      return NextResponse.json({message: "User Registered."}, {status: 201})
p  }catch(error){
    return NextResponse.json({
        message: "An error occurred while  registering the user."
    }, {status: 201})
}
    
}