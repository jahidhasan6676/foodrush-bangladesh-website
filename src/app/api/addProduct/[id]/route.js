import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Product } from "../../../../../models/addProduct";

export async function GET(req, {params}) {
    await connectionToDatabase();
    const {id} = await params;
    const product = await Product.findById(id).lean();
    if (!product) {
        return NextResponse.json({ message: "Product not Found" }, { status: 404 })
    }

    return NextResponse.json(product)
}

export async function PUT(req, { params }) {
    try {
        await connectionToDatabase();
        const { id } = await params;
        //console.log("id:", id)
        const updateData = await req.json();
        //console.log("update data:", updateData)
        const updateProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        //console.log("update product:", updateProduct)
        return NextResponse.json({ message: "Product Updated Successfully" }, { data: updateProduct })
    }catch(error){
        return NextResponse.json({message: "Server error during update"}, {status: 500})
    }
}