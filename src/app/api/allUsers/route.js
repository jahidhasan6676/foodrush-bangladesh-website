import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import User from "../../../../models/user";


export async function GET() {
  try {
    await connectionToDatabase();

    // Customers
    const customers = await User.find({ role: "customer" });

    // Vendors
    const vendors = await User.find({ role: "vendor" });

    // Riders
    const riders = await User.find({ role: "rider" });

    return NextResponse.json({
      customers,
      vendors,
      riders
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// export async function DELETE(req) {
    

//     await connectionToDatabase();
//     try {
//         const body = await req.json();
//         //console.log("body", body)
//         const { userId } = body;
//         //console.log("UserId", userId)

//         const deletedUser = await User.findByIdAndDelete(userId);
//         //console.log("deleted user", deletedUser)

//         if (!deletedUser) {
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: 'Server error', error }, { status: 500 });
//     }


// }