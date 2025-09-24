
import connectionToDatabase from "../../../../lib/db";
import { Payment } from "../../../../models/payment";
import { Shop } from "../../../../models/addShop";
import { NextResponse } from "next/server";
import User from "../../../../models/user";


export async function GET() {
    try {
        await connectionToDatabase();

        // ✅ Order stats
        const totalOrders = await Payment.countDocuments();
        const deliveredOrders = await Payment.countDocuments({ status: "Delivered" });
        const canceledOrders = await Payment.countDocuments({ status: "Canceled" });
        const pendingOrders = await Payment.countDocuments({ status: "Pending" });

        // active customer
        const activeCustomers = await User.countDocuments({ role: "customer" });

        // ✅ Active Riders
        const activeRiders = await User.countDocuments({ role: "rider" });

        // ✅ Total Shops
        const totalShops = await Shop.countDocuments();


        const totalIncomeAgg = await Payment.aggregate([
            { $match: { status: "Delivered" } },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);
        const totalIncome = totalIncomeAgg[0]?.total || 0;

        // area chart monthly order and income
        const monthlyStats = await Payment.aggregate([
            {
                $match: { status: "Delivered" } // Delivered orders
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    orders: { $sum: 1 },
                    income: { $sum: "$price" }
                }
            },
            { $sort: { "_id": 1 } } // January → December
        ]);

        // Map month number to name
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const data = monthlyStats.map(item => ({
            month: monthNames[item._id - 1],
            orders: item.orders,
            income: item.income
        }));

        return NextResponse.json({
            totalOrders,
            deliveredOrders,
            canceledOrders,
            pendingOrders,
            activeCustomers,
            activeRiders,
            totalShops,
            totalIncome,
            data
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
