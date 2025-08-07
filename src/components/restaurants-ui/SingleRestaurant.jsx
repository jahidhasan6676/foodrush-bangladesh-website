"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { FaBiking, FaClock, FaHeart, FaInfoCircle, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { GoClock } from "react-icons/go";
import { MdInfoOutline } from 'react-icons/md';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const SingleRestaurant = () => {
    const params = useParams();
    const { id } = params;
    const searchParams = useSearchParams();
    const location = searchParams.get("location");

    const { data: restaurant, isLoading } = useQuery({
        queryKey: ['singleRestaurant', id],
        queryFn: async () => {
            const res = await axios.get(`/api/restaurant/allRestaurants/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <h2>Loading...</h2>;
    if (!restaurant) return <h2>No restaurant found.</h2>

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
        </div>
    );
};

export default SingleRestaurant;
