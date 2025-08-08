import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../../lib/db"
import { Shop } from "../../../../../../models/addShop";
import { Product } from "../../../../../../models/addProduct";

export async function GET(req, {params}) {
    try{
        await connectionToDatabase();
        const {id} = await params;

        const singleShop = await Shop.findById(id).lean();
        const email = singleShop.ownerInfo.email;
        //console.log("single shop", singleShop)
        const product = await Product.find({"owner.email": email})
        return NextResponse.json({ shop: singleShop, products: product }, {status: 200})

    }catch(error){
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
    
}
