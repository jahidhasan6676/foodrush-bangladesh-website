"use client"
import React, { useState } from 'react';

const VendorRequest = () => {
    const [requests, setRequests] = useState([
        {
            _id: "1",
            customerName: "Jahid Hasan",
            shopName: "Food Lovers",
            category: "Fast Food",
            status: "Pending",
        },
        {
            _id: "2",
            customerName: "Rafiq",
            shopName: "Sweet & Spicy",
            category: "Dessert",
            status: "Pending",
        },
    ]);
    return (
        <div className='w-11/12 mx-auto py-10'>
            <div className="bg-white  rounded-xl p-6 w-full">
                <h2 className="text-xl font-semibold mb-4">Vendor Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b">Customer Name</th>
                                <th className="p-3 border-b">Shop Name</th>
                                <th className="p-3 border-b">Category</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{req.customerName}</td>
                                    <td className="p-3 border-b">{req.shopName}</td>
                                    <td className="p-3 border-b">{req.category}</td>
                                    <td
                                        className={`p-3 border-b font-medium ${req.status === "Pending"
                                            ? "text-yellow-600"
                                            : req.status === "Accepted"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {req.status}
                                    </td>
                                    <td className="p-3 border-b space-x-2">
                                        {req.status === "Pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(req._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(req._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {req.status !== "Pending" && (
                                            <span className="italic text-gray-500">Action Taken</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VendorRequest;