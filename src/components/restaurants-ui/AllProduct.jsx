"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { CiDiscount1 } from "react-icons/ci";

const AllProduct = () => {
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    console.log("location", location)

    const { data: searchProduct, isLoading, refetch } = useQuery({
        queryKey: ["searchProduct", location],
        queryFn: async () => {
            const res = await axios.get(`/api/products/search?location=${location}`)
            return res.data;
        }
    })

    // all approve product get from database
    const { data: allRestaurantsProducts } = useQuery({
        queryKey: ["pendingProducts"],
        queryFn: async () => {
            const res = await axios.get("/api/approvedProduct")
            return res.data;
        }
    })

    if (isLoading) return <h2>Loading...</h2>

    console.log("search Product", searchProduct)
    return (
        <div className="w-11/12 mx-auto flex gap-10 my-10">
            {/* Left Sidebar - Filters */}
            <aside className="w-64 bg-white p-5 h-fit border">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Sort by</h3>
                    <ul>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="sortBy" value="default" defaultChecked />
                                <span className="ml-2 text-gray-700">Default</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="sortBy" value="distance" />
                                <span className="ml-2 text-gray-700">Distance</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="sortBy" value="topReviewed" />
                                <span className="ml-2 text-gray-700">Top Reviewed</span>
                            </label>
                        </li>
                        <li>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="sortBy" value="topSellings" />
                                <span className="ml-2 text-gray-700">Top Sellings</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Meal Type</h3>
                    <ul>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="mealType" value="breakfast" />
                                <span className="ml-2 text-gray-700">Breakfast</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="mealType" value="lunch" />
                                <span className="ml-2 text-gray-700">Lunch</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="mealType" value="eveningSnacks" />
                                <span className="ml-2 text-gray-700">Evening Snacks</span>
                            </label>
                        </li>
                        <li>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-red-500" name="mealType" value="dinner" />
                                <span className="ml-2 text-gray-700">Dinner</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Price Range (0 - 2000 ₹)</h3>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            defaultValue="1000" // Example value
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span>2000</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Delivery Time (0 - 100 min)</h3>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="50" // Example value
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search for food"
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>

                {/* Your Daily Deals */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6">Your Daily Deals</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {searchProduct?.map((food) => (
                            <div key={food?._id} className="rounded-md shadow-sm overflow-hidden">
                                <div className="relative">
                                    <Image src={food?.photo} alt={food?.productName} width={400} height={250} className="w-full h-44 object-cover" />
                                    <div className="absolute top-2 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-bold"><CiDiscount1 className='text-white text-lg' />FOODRUSH</div>
                                    {food?.discountPrice && (
                                        <div className="absolute top-10 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
                                            <CiDiscount1 className='text-white text-lg' /> {food?.discountPrice}
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 bg-white text-sm rounded-full px-2 py-1 flex items-center gap-1">
                                        <Clock size={14} /> {food?.deliveryTime} min.
                                    </div>
                                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                        <Heart size={16} className="text-gray-500" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-lg">{food?.productName}</h3>
                                    <p className="text-gray-500 text-sm">টট{food?.category}</p>
                                    <div className="flex items-center gap-6 mt-2 text-sm">
                                        <div className="flex items-center gap-1 text-red-600">
                                            <Star size={14} /> {food?.rating || 0} ({food?.reviews || 0})
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-red-600">
                                            {food?.price}<span className='ml-1'>tk</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                {/* all restaurants products card */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6">All Restaurants</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {allRestaurantsProducts?.map((food) => (
                            <div key={food?._id} className="rounded-md shadow-sm overflow-hidden">
                                <div className="relative">
                                    <Image src={food?.photo} alt={food?.productName} width={400} height={250} className="w-full h-44 object-cover" />
                                    <div className="absolute top-2 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-bold"><CiDiscount1 className='text-white text-lg' />FOODRUSH</div>

                                    {food?.discountPrice ? (
                                        <div className="absolute top-10 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
                                            <CiDiscount1 className='text-white text-lg' /> {food?.discountPrice}
                                        </div>
                                    ) : ""}

                                    <div className="absolute bottom-2 right-2 bg-white text-sm rounded-full px-2 py-1 flex items-center gap-1">
                                        <Clock size={14} /> {food?.deliveryTime} min.
                                    </div>
                                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                        <Heart size={16} className="text-gray-500" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-lg">{food?.productName}</h3>
                                    <p className="text-gray-500 text-sm">টট{food?.category}</p>
                                    <div className="flex items-center gap-6 mt-2 text-sm">
                                        <div className="flex items-center gap-1 text-red-600">
                                            <Star size={14} /> {food?.rating || 0} ({food?.reviews || 0})
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-red-600">
                                            {food?.price}<span className='ml-1'>tk</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            </main>
        </div>
    );
};

export default AllProduct;