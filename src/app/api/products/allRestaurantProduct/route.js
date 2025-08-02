// allRestaurantProduct/route.js
import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import { Product } from "../../../../../models/addProduct";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);

        const sortBy = searchParams.get("sortBy") || "default";
        const category = searchParams.get("category") || "";
        const maxPrice = searchParams.get("maxPrice") || 2000;
        const searchQuery = searchParams.get("searchQuery") || "";


        // Base query
        let query = { status: "approved" };

        // Add category filter if specified
        if (category) {
            query.category = { $regex: new RegExp(category, "i") };
        }

        // Price filter
        query.price = { $lte: parseInt(maxPrice) };
       

        // Add search query filter if specified
        if (searchQuery) {
            query.productName = { $regex: new RegExp(searchQuery, "i") };
        }

        // Sort logic
        let sortOption = {};
        if (sortBy === "distance") {
            sortOption = { deliveryTime: 1 }; // Sort by delivery time ascending
        }

        const allRestaurantProduct = await Product.find(query).sort(sortOption);
        return NextResponse.json(allRestaurantProduct, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}