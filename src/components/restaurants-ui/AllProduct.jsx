"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const AllProduct = () => {
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    console.log("location", location)

    const {data: searchProduct, isLoading, refetch} = useQuery({
        queryKey: ["searchProduct", location],
        queryFn: async()=>{
            const res = await axios.get(`/api/products/search?location=${location}`)
            return res.data;
        }
    })
    if(isLoading) return <h2>Loading...</h2>

    console.log("search Product", searchProduct)
    return (
        <div>
            all product: {searchProduct?.length}
        </div>
    );
};

export default AllProduct;