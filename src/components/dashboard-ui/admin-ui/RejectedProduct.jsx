"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

const RejectedProduct = () => {
    // all approve product get from database
    const { data: allRejectedProducts, isLoading, refetch } = useQuery({
        queryKey: ["rejectedProducts"],
        queryFn: async () => {
            const res = await axios.get("/api/rejectedProduct")
            return res.data;
        }
    })
    return (
        <div className='w-11/12 mx-auto py-10'>

            <div className='overflow-x-auto'>
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Product Name</th>
                            <th className="p-2">Vendor Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {allRejectedProducts?.map((product, idx) => (
                            <tr key={product._id} className="border-t">
                                <td className="p-2">{idx + 1}</td>
                                <td className="p-2">
                                    <Image src={product?.photo} alt='image pic' width={70} height={70} className='rounded-sm' />
                                </td>
                                <td className="p-2">{product?.productName}</td>
                                <td className="p-2">{product?.owner?.name}</td>
                                <td className="p-2">{product?.price}TK.</td>
                                <td className="p-2">{product?.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RejectedProduct;