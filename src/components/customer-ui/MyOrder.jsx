"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FaRegUser } from 'react-icons/fa';
import { useState } from 'react';

const MyOrder = () => {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("waiting"); // default waiting

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", session?.user?.email],
        queryFn: async () => {
            const res = await axios.get("/api/myOrder", { params: { email: session?.user?.email } });
            return res?.data;
        }
    })

    if (isLoading) return <h2>Loading...</h2>

    // filter logic
    const filteredOrders =
        activeTab === "waiting"
            ? orders.filter(order => order?.status !== "Delivered") // Pending, Shipped, Out for delivery
            : orders.filter(order => order?.status === "Delivered"); // Complete Orders

    return (
        <div className="w-11/12 mx-auto py-10">
            <div className="flex gap-10 min-h-[calc(100vh-140px)] rounded-md py-10 w-full">
                {/* Sidebar */}
                <div className='bg-white shadow-lg w-2/6'>
                    <h2 className="text-[22px] font-medium py-3 px-4">My Orders</h2>

                    <div>
                        <div
                            onClick={() => setActiveTab("waiting")}
                            className={`flex items-center gap-3 py-3 border-t px-4 text-[17px] cursor-pointer
                                ${activeTab === "waiting" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                        >
                            <FaRegUser className="w-[18px] h-[18px]" />
                            Waiting Orders
                        </div>
                        <div
                            onClick={() => setActiveTab("complete")}
                            className={`flex items-center gap-3 py-3 px-4 text-[17px] cursor-pointer
                                ${activeTab === "complete" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                        >
                            <FaRegUser className="w-[18px] h-[18px]" />
                            Complete Orders
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className='w-4/6'>
                    {filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <p className="text-gray-500 text-lg">You have no {activeTab === "waiting" ? "waiting" : "complete"} orders.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr className="text-sm">
                                        <th className="p-3">No.</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Items</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Transaction</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr key={order?._id} className="border-t border-gray-300 text-center">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{order?.price.toFixed(2)} TK</td>
                                            <td className="p-3">{order?.cartIds?.length}</td>
                                            <td className="p-3">
                                                {new Date(order?.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="p-3 text-sm">{order?.transactionId}</td>
                                            <td className="p-3">
                                                <span
                                                    className="px-3 py-1 text-sm text-white rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            order?.status === "Pending"
                                                                ? "black"
                                                                : order?.status === "Shipped"
                                                                    ? "blue"
                                                                    : order?.status === "Out for delivery"
                                                                        ? "purple"
                                                                        : order?.status === "Delivered"
                                                                            ? "green"
                                                                            : "",
                                                    }}
                                                >
                                                    {order?.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span

                                                    className={`px-3 py-1 rounded-md text-sm text-white 
                                                            ${order?.status === "Delivered"
                                                            ? "bg-gray-800 cursor-pointer"
                                                            : "bg-gray-400 cursor-not-allowed opacity-50"}`}
                                                >
                                                    Review
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
