"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const NewOrders = () => {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("new");

    const { data: allOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['allOrders', session?.user?.email],
        queryFn: async () => {
            const data = await axios.get("/api/newOrders", { params: { email: session?.user?.email } })
            return data.data;
        }
    });

    const handleStatusChange = async (orderPlaced, id) => {
        try {
            await axios.patch(`/api/newOrders/${id}`, {
                statusUpdate: orderPlaced
            });
            refetch();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    if (isLoading) return <h2>Loading...</h2>

    // Filtered orders
    const filteredOrders = allOrders.filter(order =>
        activeTab === "new"
            ? order.status !== "Delivered"
            : order.status === "Delivered"
    );

    return (
        <div className="w-11/12 mx-auto py-10">
            {/* Tabs */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setActiveTab("new")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "new" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    New Orders
                </button>
                <button
                    onClick={() => setActiveTab("Delivered")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "Delivered" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    Delivered Orders
                </button>
            </div>

            <div className="rounded-md bg-white min-h-[calc(100vh-180px)] ">
                {
                    Array.isArray(filteredOrders) && filteredOrders?.length > 0 ? (
                        <div className=" w-full">
                            {
                                filteredOrders?.map(order => (
                                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 border rounded-md mb-4" key={order?._id}>
                                        {/* Product Icon */}
                                        <div className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-md">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Package" className="w-12" />
                                        </div>

                                        {/* Product Details */}
                                        <div>
                                            {order?.productItems?.map((item, index) => (
                                                <div key={index}>
                                                    <p className="text-xs flex flex-col gap-1">{item}</p>
                                                </div>
                                            ))}
                                            <p className="text-sm font-medium mt-2">{order?.name}</p>
                                            <p className="text-sm font-medium mt-1">{order?.deliveryInfo?.phone}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm mb-2">Items: <strong>{order?.productItems?.length}</strong></p>
                                            <p className="text-gray-500 text-sm">Method: <strong>{order?.method}</strong></p>
                                            <p className="text-gray-500 text-sm">Payment: <span className="text-blue-500 font-semibold">{order?.payment}</span></p>
                                            <p className="text-gray-500 text-sm">Date: <strong>{new Date(order?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</strong></p>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <p className=""><span className="font-medium">{order?.price}</span>TK</p>
                                        </div>

                                        {/* Status Dropdown */}
                                        <div>
                                            <select
                                                defaultValue={order?.status}
                                                disabled={order?.status === "Delivered"}
                                                onChange={(e) => handleStatusChange(e.target.value, order?._id)}
                                                className={`border px-3 py-2 rounded-md bg-white shadow-sm cursor-pointer focus:outline-none disabled:cursor-not-allowed`}>
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for delivery">Out for delivery</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (<p className="text-gray-500 text-lg font-medium flex justify-center items-center h-40">No {activeTab === "new" ? "new" : "delivered"} orders found.</p>)
                }
            </div>
        </div>
    );
};

export default NewOrders;
