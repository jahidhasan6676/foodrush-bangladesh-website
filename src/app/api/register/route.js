import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        //console.log(" Received signup data:", name, email);

        await connectionToDatabase();
        //console.log(" DB connected");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            //console.warn(" User already exists");
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: "customer" });
        //console.log(" New user object:", newUser);

        await newUser.save();
        //console.log(" User saved to DB");

        return NextResponse.json({ message: "User Registered Successfully.", user: newUser });

    } catch (error) {
        //console.error(" Error during registration:", error);
        return NextResponse.json({
            message: "An error occurred while registering the user.",
            error: error.message
        }, { status: 500 });
    }
}
