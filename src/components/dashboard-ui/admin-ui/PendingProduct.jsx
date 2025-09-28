"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

const PendingProduct = () => {

    // all pending product get from database
    const { data: allPendingProducts, isLoading, refetch } = useQuery({
        queryKey: ["pendingProducts"],
        queryFn: async () => {
            const res = await axios.get("/api/pendingProduct")
            return res.data;
        }
    })

    const handleStatusChange = async(id,newStatus) =>{
        console.log("product id", id)
        console.log("new status", newStatus)
        const res = await axios.patch(`/api/pendingProduct/${id}`, {status: newStatus})
        console.log("update status", res.data);
        if(res.status === 200){
            toast.success("Product status successfully updated")
            refetch();
        }

    }
    if (isLoading) return <h2>Loading data...</h2>
    //console.log("pending data", allPendingProducts)
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
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPendingProducts?.map((product,idx) => (
                        <tr key={product._id} className="border-t">
                            <td className="p-2">{idx+1}</td>
                            <td className="p-2">
                                <Image src={product?.photo} alt='image pic' width={70} height={70} className='rounded-sm'/>
                            </td>
                            <td className="p-2">{product?.productName}</td>
                            <td className="p-2">{product?.owner?.name}</td>
                            <td className="p-2">{product?.price}TK.</td>
                            <td className="p-2">{product?.status}</td>
                          
                            <td className="p-2  space-x-1">
                                <button onClick={()=>handleStatusChange(product?._id, "approved")}  className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
                                    Approve
                                </button>
                                <button onClick={()=>handleStatusChange(product?._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                                    Reject
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

export default PendingProduct;