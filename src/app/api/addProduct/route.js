import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Product } from "../../../../models/addProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(req) {
    try {
        const body = await req.json();
        //console.log("body", body)
        await connectionToDatabase();

        const addProduct = await Product.create(body)
        return NextResponse.json({ message: "Product Save Successfully", data: addProduct })
    } catch (error) {
        console.log("Error Saving data", error);
        return NextResponse.json({ message: "Error Saving Data" }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        //console.log("params", searchParams)
        const email = searchParams.get("email");
        //console.log("email:", email)
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const allProductData = await Product.find({ "ownerInfo.email": email }).lean();
        return NextResponse.json(allProductData, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectionToDatabase();

        const session = await getServerSession(authOptions);
        //console.log("session", session)
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        //console.log("id", id)

        const product = await Product.findById(id).lean();
        //console.log("product info", product)

        //Check if the logged-in user's email matches product owner email
        if (product?.ownerInfo?.email !== session?.user?.email) {
            return NextResponse.json({ message: "Access denied" }, { status: 403 })
        }

        //successfully delete product
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product Delete Successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Server error during delete" }, { status: 500 });
    }
}

