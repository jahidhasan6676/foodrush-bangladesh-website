"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleProduct = () => {
    const params = useParams();
    const {id} = params;
     const { data: singleProduct, isLoading, refetch } = useQuery({
        queryKey: ["singleProduct", id],
        queryFn: async () => {
            const res = await axios.get(`/api/products/allRestaurantProduct/${id}`)
            return res.data;
        }
    });

    if(isLoading) return <h2>Loading...</h2>
    console.log("single Product", singleProduct)
    return (
        <div>
            <h1>Single Product</h1>
        </div>
    );
};

export default SingleProduct;