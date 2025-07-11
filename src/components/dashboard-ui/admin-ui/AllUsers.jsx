"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { MdDelete } from "react-icons/md";

const ResponsiveTable = () => {

    const { data: session } = useSession();

    const { data: allUsers = [], isLoading, error, refetch } = useQuery({
        queryKey: ["allUsers", session?.user?.email],
        queryFn: async () => {
            const res = await axios.get(`/api/allUsers?adminEmail=${session?.user?.email}`,);
            return res?.data;
        }
    })
    if (isLoading) return <h2>Loading...</h2>
    

    return (
        <div className="w-11/12 mx-auto py-10">
            <div className="overflow-x-auto bg-white rounded-xl">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 ">
                        <tr>
                            <th className="px-6 py-4 font-bold uppercase">ID</th>
                            <th className="px-6 py-4 font-bold uppercase">Name</th>
                            <th className="px-6 py-4 font-bold uppercase">Email</th>
                            <th className="px-6 py-4 font-bold uppercase">Role</th>
                            <th className="px-6 py-4 font-bold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-[16px]  text-gray-800">
                        {allUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>

                                <td className="px-6 py-4">
                                    <button
                                        className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResponsiveTable;

