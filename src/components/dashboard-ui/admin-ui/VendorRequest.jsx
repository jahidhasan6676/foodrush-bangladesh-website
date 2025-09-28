"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const VendorRequest = () => {

    const { data: forms = [], isLoading } = useQuery({
        queryKey: ["form"],
        queryFn: async () => {
            const res = await axios.get("/api/seeMemberForm");
            return res?.data;
        }
    })

    // vendor request accepted
    const handleVendorRequestApprove = async (id) => {
        // console.log(id)
        try {
            const res = await axios.patch(`/api/seeMemberForm/${id}`);
             console.log("update data", res.data);
           
        } catch (error) {
            console.log("error", error)
            toast.error("Something Wrong")
        }
    }

    if (isLoading) return <h2>Loading...</h2>
    return (
        <div className='w-11/12 mx-auto py-10'>
            <div className="bg-white  rounded-xl w-full">

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
                            {forms?.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{req?.name}</td>
                                    <td className="p-3 border-b">{req?.shopName}</td>
                                    <td className="p-3 border-b">{req?.category}</td>
                                    <td
                                        className={`p-3 border-b font-medium ${req.status === "pending"
                                            ? "text-yellow-600"
                                            : req.status === "Accepted"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {req.status}
                                    </td>
                                    <td className="p-3 border-b space-x-2">
                                        {req.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleVendorRequestApprove(req._id)}
                                                    className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                                                    Accept
                                                </button>

                                                <button
                                                    //onClick={() => handleReject(req._id)}
                                                    className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {req.status !== "pending" && (
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