import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/db";
import { Shop } from "../../../../models/addShop";
import { Payment } from "../../../../models/payment";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const vendorEmail = searchParams.get("email");
        //console.log("vendorEmail", vendorEmail)

        if (!vendorEmail) {
            return NextResponse.json(
                { message: "Vendor email is required" },
                { status: 400 }
            );
        }


        const shop = await Shop.findOne({ "ownerInfo.email": vendorEmail });
        //console.log("shop find", shop)
        if (!shop) {
            return NextResponse.json(
                { message: "Shop not found for this vendor" },
                { status: 404 }
            );
        }


        const orders = await Payment.aggregate([
            {
                $match: {
                    shopId: shop._id,
                    status: { $ne: "Delivered" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productIds",
                    foreignField: "_id",
                    as: "productItems"
                }
            },
            {
                $project: {
                    email: 1,
                    name: 1,
                    price: 1,
                    shopId: 1,
                    transactionId: 1,
                    status: 1,
                    date: 1,
                    payment: 1,
                    method: 1,
                    deliveryInfo: 1,
                    createdAt: 1,
                    updatedAt: 1,

                    productItems: {
                        $map: {
                            input: "$productItems",
                            as: "p",
                            in: "$$p.productName"
                        }
                    }
                }
            }
        ]);
        //console.log("orders", orders)

        return NextResponse.json(orders || [], { status: 200 });
    } catch (error) {
        console.error("Error fetching vendor orders:", error);
        return NextResponse.json(
            { message: "something went wrong", status: 500 }
        );
    }
}

