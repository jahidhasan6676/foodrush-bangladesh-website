import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";

export async function GET(req) {
   

    await connectionToDatabase();
    const url = new URL(req.url);
    const adminEmail = url.searchParams.get("adminEmail");

    try {
        const users = await User.find({ email: { $ne: adminEmail } });
        return NextResponse.json(users, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }

}

export async function DELETE(req) {
    

    await connectionToDatabase();
    try {
        const body = await req.json();
        //console.log("body", body)
        const { userId } = body;
        //console.log("UserId", userId)

        const deletedUser = await User.findByIdAndDelete(userId);
        //console.log("deleted user", deletedUser)

        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }


}