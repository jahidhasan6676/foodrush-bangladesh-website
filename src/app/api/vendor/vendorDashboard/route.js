import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/db";
import mongoose from "mongoose";
import { Payment } from "../../../../../models/payment";

export async function GET(req) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const shopId = searchParams.get("shopId");
        if (!shopId) {
            return NextResponse.json({ error: "shopId required" }, { status: 400 });
        }
        //console.log("shop Id ", shopId)

        const shopObjId = new mongoose.Types.ObjectId(shopId);

        // stats
        const totalOrders = await Payment.countDocuments({ shopId: shopObjId });
        const revenueAgg = await Payment.aggregate([
            { $match: { shopId: shopObjId } },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ])
        const revenue = revenueAgg[0]?.total || 0;

        const pendingOrders = await Payment.countDocuments({
            shopId: shopObjId,
            status: "Pending",
        });

        const completedOrders = await Payment.countDocuments({
            shopId: shopObjId,
            status: "Delivered",
        });

        // line chart
        const monthlySales = await Payment.aggregate([
            { $match: { shopId: shopObjId } },
            {
                $group: {
                    _id: { $month: "$date" },
                    totalSales: { $sum: "$price" }
                }
            },
            { $sort: { "_id": 1 } }
        ])

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const lineChart = monthlySales.map((m) => ({
            name: monthNames[m._id - 1],
            sales: m.totalSales,
        }));

        // ---------- Pie Chart ----------
        const statusAgg = await Payment.aggregate([
            { $match: { shopId: shopObjId } },
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ]);

        const pieChart = statusAgg.map((s) => ({
            name: s._id,
            value: s.count,
        }));

        // ---------- Recent Orders ----------
        const recentOrders = await Payment.aggregate([
            { $match: { shopId: shopObjId } },
            { $sort: { date: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "productIds",
                    foreignField: "_id",
                    as: "products",
                },
            },
        ]);

        const formattedRecentOrders = recentOrders.map((order) => ({
            id: order._id,
            customer: order.name,
            item: order.products[0]?.productName || "N/A",
            status: order.status,
            amount: order.price,
            date: order.date,
        }));

        return NextResponse.json({
            stats: {
                totalOrders,
                revenue,
                pendingOrders,
                completedOrders,
            },
            lineChart,
            pieChart,
            recentOrders: formattedRecentOrders,
        });


    } catch (err) {
        return NextResponse.json({ message: "Vendor Dashboard data not found" }, { status: 500 })
    }
}