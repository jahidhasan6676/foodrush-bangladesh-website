"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaBiking, FaClock, FaHeart, FaInfoCircle, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { GoClock } from "react-icons/go";
import { MdInfoOutline } from 'react-icons/md';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const SingleRestaurant = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const params = useParams();
    const { id } = params;
    const searchParams = useSearchParams();
    const location = searchParams.get("location");

    const { data: restaurantData, isLoading } = useQuery({
        queryKey: ['singleRestaurant', id],
        queryFn: async () => {
            const res = await axios.get(`/api/restaurant/allRestaurants/${id}`);
            return res.data;
        },
    });

    const restaurant = restaurantData?.shop;
    const products = restaurantData?.products;
    console.log("products", products)


    if (isLoading) return <h2>Loading...</h2>;
    // if (!restaurant) return <h2>No restaurant found.</h2>
    console.log("shop products", restaurantData)

    {
        restaurantData?.products?.map(p => {
            const discountPercent = restaurantData?.shop?.discount || 0;
            const discountPrice = p?.price - (p?.price * discountPercent / 100)
        })
    }

    return (
        <div className="w-11/12 mx-auto py-10">
            <div className='flex flex-wrap gap-3'>
                <h3 className='flex items-center gap-2 text-sm text-gray-700 '>
                    <span><Link href={"/"}>Home</Link></span> <IoIosArrowForward />
                </h3>
                <h3 className='flex items-center gap-2 text-sm text-gray-700 '>
                    <span className='font-medium'><Link href={`/restaurants/allRestaurant?location=${location}`}>Restaurant</Link></span><IoIosArrowForward />
                </h3>
                <h3 className=' text-sm text-gray-600'>
                    <span>{restaurant?.shopName}</span>
                </h3>
            </div>

            {/* shop details */}
            <div className="border-b py-6">
                <div className="flex items-start gap-4">
                    {/* Restaurant Image */}
                    <div className="w-[150px] h-[150px] rounded-sm overflow-hidden">
                        <Image
                            src={restaurant?.shopPhoto || "/default.jpg"}
                            alt={restaurant?.shopName}
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="">
                            <h2 className=" text-3xl md:text-4xl font-bold text-gray-800">{restaurant?.shopName}</h2>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <div className="flex text-red-500">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <FaStar
                                        key={i}
                                        className={
                                            i <= Math.round(restaurant?.rating)
                                                ? "text-red-500"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                            <span>
                                {restaurant?.rating} ({restaurant?.totalRatings})
                            </span>
                            <span className='font-medium '>See Reviews</span>
                            <span className=" flex items-center gap-1 cursor-pointer">
                                <MdInfoOutline className="text-[20px]" /> More Info
                            </span>
                        </div>

                        {/* Delivery Info */}
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-700 text-font-medium">
                            <span className="flex items-center gap-1">
                                <FaBiking className='text-[20px]' /> Delivery Fee <strong>{restaurant?.deliveryCharge}TK</strong>
                            </span>
                            <span className="flex items-center gap-1 font-medium">
                                💼 Tk 50 minimum
                            </span>
                        </div>

                        {/* Distance & Time */}
                        <div className=" mt-2 text-gray-700">
                            <span className="flex items-center gap-1 font-medium">
                                <GoClock /> Delivery {restaurant?.deliveryTime} min
                            </span>
                        </div>

                        {/* Cuisines */}
                        {/* <div className="flex flex-wrap items-center gap-3 mt-3">
                            <span className="text-gray-700 font-medium">Cuisines:</span>
                            {restaurant?.cuisines?.map((item, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>

            {/* shop all product */}
            <section className='space-y-10'>
                <div className='py-3 bg-gray-300'>
                    menu
                </div>

                {/* product and cart */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    {products?.map((product) => {
                        const discountPercent = restaurantData?.shop?.discount || 0;
                        const discountPrice = product?.price - (product?.price * discountPercent / 100);

                        return (
                            <div key={product?._id} >
                                <div className='flex justify-between border hover:shadow-sm p-5 rounded-md'>
                                    <div className='flex flex-col justify-between items-start'>
                                        <h1 className='text-lg font-medium text-gray-700'>{product?.productName}</h1>

                                        {discountPercent > 0 ? (
                                            <div className="flex gap-2 items-center">
                                                <p className='font-medium text-gray-600'>{discountPrice} TK</p>
                                                <p className='line-through text-gray-500 text-sm'>{product.price} TK</p>
                                                <span className='bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded'>
                                                    {discountPercent}% OFF
                                                </span>
                                            </div>
                                        ) : (
                                            <p className='font-medium text-gray-700'>{product.price} TK</p>
                                        )}
                                    </div>

                                    <div className='w-[110px] h-[110px]'>
                                        <Image
                                            src={product?.photo}
                                            alt='product picture'
                                            width={110}
                                            height={110}
                                            className='rounded-sm object-cover w-full h-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                </div>
            </section>

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-[400px] p-5 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.productName}</h2>
                        <p className="text-gray-700 mb-4">
                            Tk {selectedProduct.price}
                        </p>
                        <div className="flex items-center gap-3">
                            <button className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full">-</button>
                            <span>1</span>
                            <button className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full">+</button>
                            <button className="bg-orange-500 text-white flex-1 py-2 rounded">Add to cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleRestaurant;
