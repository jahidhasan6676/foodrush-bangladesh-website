"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CiDiscount1 } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const AllProduct = () => {
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: "default",
        category: "",
        priceRange: 2000,
        searchQuery: ""
    });

    // Apply filters and refetch data
    const applyFilters = () => {
        refetch();
        setShowMobileFilters(false);
    };

    const isAnyFilterActive = () => {
        return (
            filters.sortBy !== "default" ||
            filters.category !== "" ||
            filters.priceRange !== 2000 ||
            filters.searchQuery.trim() !== ""
        );
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            sortBy: "default",
            category: "",
            priceRange: 2000,
            searchQuery: ""
        });
    };

    const { data: searchProduct, isLoading, refetch } = useQuery({
        queryKey: ["searchProduct", location,],
        queryFn: async () => {
            const res = await axios.get(`/api/products/search?location=${location}`)
            return res.data;
        }
    });

    // all approve product get from database
    const { data: allRestaurantsProducts } = useQuery({
        queryKey: ["restaurantProducts", filters],
        queryFn: async () => {
            const res = await axios.get(`/api/products/allRestaurantProduct?sortBy=${filters.sortBy}&category=${filters.category}&maxPrice=${filters.priceRange}&searchQuery=${filters.searchQuery}`)
            return res.data;
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchChange = (e) => {
        setFilters(prev => ({
            ...prev,
            searchQuery: e.target.value
        }));
    };



    if (isLoading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
    );

    console.log("search product:", searchProduct)

    return (
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-6 my-10">
            {/* Mobile Filter Button */}
            <div className='flex gap-2 items-center justify-between lg:hidden bg-red-600 text-white px-4 py-2 rounded-lg '>
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 w-4/5"
                >
                    <FiFilter /> Filters
                </button>

                {isAnyFilterActive() && (
                    <button
                        onClick={resetFilters}
                        className=" text-white lg:hidden">
                        Clear All
                    </button>
                )}
            </div>



            {/* Left Sidebar - Filters */}
            <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 z-50 bg-white p-5 h-fit border lg:w-64 w-full overflow-y-auto`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="lg:hidden text-gray-500 hover:text-red-500"
                    >
                        <IoClose size={24} />
                    </button>

                    {isAnyFilterActive() && (
                        <button
                            onClick={resetFilters}
                            className="text-lg font-medium text-red-600 hidden lg:block">
                            Clear All
                        </button>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Sort by</h3>
                    <ul>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="sortBy"
                                    value="default"
                                    checked={filters.sortBy === "default"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Default</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="sortBy"
                                    value="distance"
                                    checked={filters.sortBy === "distance"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Delivery Time</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Category</h3>
                    <ul>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Food"
                                    checked={filters.category === "Food"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Food</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Drink"
                                    checked={filters.category === "Drink"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Drink</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Dessert"
                                    checked={filters.category === "Dessert"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Dessert</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Biryani"
                                    checked={filters.category === "Biryani"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Biryani</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Burger"
                                    checked={filters.category === "Burger"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Burger</span>
                            </label>
                        </li>
                        <li className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Juice"
                                    checked={filters.category === "Juice"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Juice</span>
                            </label>
                        </li>
                        <li>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Cake"
                                    checked={filters.category === "Cake"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Cake</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Price Range (0 - {filters.priceRange} ₹)</h3>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            name="priceRange"
                            value={filters.priceRange}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>0</span>
                            <span>2000</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                        // onKeyDown={(e) => {
                        //     if (e.key === "Enter") {
                        //         refetch(); 
                        //     }
                        // }}
                        placeholder="Search by product name"
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

                {/* Active Filters */}
                {(filters.sortBy !== "default" || filters.category || filters.priceRange < 2000 || filters.deliveryTime < 100) && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {filters.sortBy !== "default" && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                {filters.sortBy === "distance" ? "Delivery Time" : "Default"}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, sortBy: "default" }))}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <IoClose size={16} />
                                </button>
                            </span>
                        )}
                        {filters.category && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                {filters.category}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, category: "" }))}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <IoClose size={16} />
                                </button>
                            </span>
                        )}
                        {filters.priceRange < 2000 && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                Max ₹{filters.priceRange}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, priceRange: 2000 }))}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <IoClose size={16} />
                                </button>
                            </span>
                        )}
                        {filters.deliveryTime < 100 && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                Max {filters.deliveryTime} min
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, deliveryTime: 100 }))}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <IoClose size={16} />
                                </button>
                            </span>
                        )}
                    </div>
                )}

                {/* Your Daily Deals */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6">Your Daily Deals</h2>
                    {searchProduct?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No products found matching your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchProduct?.map((food) => (
                                <div key={food?._id} className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                    <div className="relative">
                                        <Image
                                            src={food?.photo}
                                            alt={food?.productName}
                                            width={400}
                                            height={250}
                                            className="w-full h-44 object-cover"
                                        />
                                        <div className="absolute top-2 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-bold">
                                            <CiDiscount1 className='text-white text-lg' />FOODRUSH
                                        </div>
                                        {food?.discountPrice ? (
                                            <div className="absolute top-10 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
                                                <CiDiscount1 className='text-white text-lg' /> {food?.discountPrice} tk off
                                            </div>
                                        ) : ""}
                                        <div className="absolute bottom-2 right-2 bg-white text-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                                            <Clock size={14} /> {food?.deliveryTime} min
                                        </div>
                                        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:bg-red-100 transition">
                                            <Heart size={16} className="text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1">{food?.productName}</h3>
                                        <p className="text-gray-500 text-sm mb-3">{food?.category}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                                <Star size={14} /> {food?.rating || 0} ({food?.reviews || 0})
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {food?.discountPrice ? (
                                                    <>
                                                        <span className="font-semibold text-red-600">
                                                            {food?.price - food?.discountPrice} tk
                                                        </span>
                                                        <span className="text-gray-500 text-sm line-through">
                                                            {food?.price} tk
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-red-600">
                                                        {food?.price} tk
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* all restaurants products card */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6">All Restaurants</h2>
                    {allRestaurantsProducts?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No restaurants found matching your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allRestaurantsProducts?.map((food) => (
                                <div key={food?._id} className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                    <div className="relative">
                                        <Image
                                            src={food?.photo}
                                            alt={food?.productName}
                                            width={400}
                                            height={250}
                                            className="w-full h-44 object-cover"
                                        />
                                        <div className="absolute top-2 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-bold">
                                            <CiDiscount1 className='text-white text-lg' />FOODRUSH
                                        </div>

                                        {food?.discountPrice ? (
                                            <div className="absolute top-10 left-2 flex gap-1 items-center bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold">
                                                <CiDiscount1 className='text-white text-lg' /> {food?.discountPrice} tk off
                                            </div>
                                        ) : ""}

                                        <div className="absolute bottom-2 right-2 bg-white text-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                                            <Clock size={14} /> {food?.deliveryTime} min
                                        </div>
                                        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:bg-red-100 transition">
                                            <Heart size={16} className="text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1">{food?.productName}</h3>
                                        <p className="text-gray-500 text-sm mb-3">{food?.category}</p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                                <Star size={14} /> {food?.rating || 0} ({food?.reviews || 0})
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {food?.discountPrice ? (
                                                    <>
                                                        <span className="font-semibold text-red-600">
                                                            {food?.price - food?.discountPrice} tk
                                                        </span>
                                                        <span className="text-gray-500 text-sm line-through">
                                                            {food?.price} tk
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-red-600">
                                                        {food?.price} tk
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AllProduct;