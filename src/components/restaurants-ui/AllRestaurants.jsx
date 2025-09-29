"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { CiDiscount1 } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import jokerImage from "../../../public/joker.png"
import Link from 'next/link';
import FoodRushLoader from '../loadingSpinner/FoodRushLoader';

const AllRestaurants = () => {
    const swiperRef = useRef(null);
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: "default",
        category: "",
        searchQuery: ""
    });

    const isAnyFilterActive = () => {
        return (
            filters.sortBy !== "default" ||
            filters.category !== "" ||
            filters.searchQuery.trim() !== ""
        );
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            sortBy: "default",
            category: "",
            searchQuery: ""
        });
    };

    const { data: searchRestaurant, isLoading, refetch } = useQuery({
        queryKey: ["searchRestaurant", location,],
        queryFn: async () => {
            const res = await axios.get(`/api/restaurant/search?location=${location}`)
            return res.data;
        }
    });

    // all approve product get from database
    const { data: allRestaurant } = useQuery({
        queryKey: ["allRestaurant", filters],
        queryFn: async () => {
            const res = await axios.get(`/api/restaurant/allRestaurants?sortBy=${filters.sortBy}&category=${filters.category}&searchQuery=${filters.searchQuery}`)
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
        <div className="min-h-screen flex items-center justify-center">
            <FoodRushLoader />
        </div>
    );

    //console.log("search product:", searchRestaurant)

    return (
        <div className="w-11/12 mx-auto flex flex-col xl:flex-row gap-10 xl:14 my-10">
            {/* Mobile Filter Button */}
            <div className='flex gap-2 items-center justify-between xl:hidden bg-red-600 text-white px-4 py-2 rounded-lg '>
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 w-4/5"
                >
                    <FiFilter /> Filters
                </button>

                {isAnyFilterActive() && (
                    <button
                        onClick={resetFilters}
                        className=" text-[16px] font-medium cursor-pointer block xl:hidden">
                        Clear All
                    </button>
                )}
            </div>

            {/* Left Sidebar - Filters */}
            <aside className={`${showMobileFilters ? 'block' : 'hidden'} xl:block fixed xl:static inset-0 z-30 bg-white p-5 h-fit border lg:w-64 w-full overflow-y-auto`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="block xl:hidden text-gray-500 hover:text-red-500"
                    >
                        <IoClose size={24} />
                    </button>

                    {isAnyFilterActive() && (
                        <div className="mt-4 hidden xl:block">
                            <button
                                onClick={resetFilters}
                                className="text-[16px] font-medium text-gray-700 cursor-pointer">
                                Clear All
                            </button>
                        </div>
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
                        <li className='mb-2'>
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
                        <li>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-red-500"
                                    name="category"
                                    value="Coffee"
                                    checked={filters.category === "Coffee"}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2 text-gray-700">Coffee</span>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* <div className="mb-6">
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
                </div> */}
            </aside>

            {/* Main Content */}
            <main className="xl:w-[calc(100vw-426px)] ">
                {/* Search Bar */}
                <div className="relative mb-10">
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
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#e21b70]"
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

                {/* offer card */}
                <div className='mb-10 bg-[#ffdddd] rounded-lg'>
                    <div className='flex justify-between items-center px-4 '>
                        {/* left content */}
                        <div className='flex items-center gap-6'>
                            <div>
                                <Image src={jokerImage} alt='joker' width={80} height={80} className='' />
                            </div>
                            <div>
                                <h1 className='text-[#c21d63] text-[24px] font-extrabold'>Time's Up...</h1>
                                <p className='text-[#c21d63] '>Look out for flash deals next time!</p>
                            </div>
                        </div>
                        {/* right content */}
                        <div className='bg-[#c21d63] w-fit h-fit p-3 rounded-sm'>
                            <h1 className='text-white text-sm font-medium'>00:00</h1>
                        </div>
                    </div>
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
                        {/* {filters.priceRange < 2000 && (
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
                        )} */}
                    </div>
                )}

                {/* Your Daily Deals */}
                <section className="mb-10 ">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Your Searching Deals</h2>
                    {searchRestaurant?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No products found matching your filters</p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Navigation Buttons */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] z-10">
                                <div
                                    className="button-prev-slide w-[30px] h-[30px] shadow-sm bg-white rounded-full grid place-items-center cursor-pointer"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                >
                                    <IoIosArrowBack size={20} />
                                </div>
                            </div>

                            <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] z-10">
                                <div
                                    className="button-next-slide w-[30px] h-[30px] shadow-sm bg-white rounded-full grid place-items-center cursor-pointer "
                                    onClick={() => swiperRef.current?.slideNext()}
                                >
                                    <IoIosArrowForward size={20} />
                                </div>
                            </div>
                            <Swiper
                                spaceBetween={25}
                                slidesPerView={1}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                navigation={false} // we're using custom buttons
                                modules={[Navigation]}
                                className="pt-4"
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }} >

                                {searchRestaurant?.map((restaurant) => (

                                    <SwiperSlide key={restaurant?._id}>
                                        <Link href={`/restaurants/allRestaurant/${restaurant?._id}`} >
                                            <div className="rounded-lg border overflow-hidden">
                                                <div className="relative group  overflow-hidden">
                                                    <Image
                                                        src={restaurant?.shopPhoto}
                                                        alt={restaurant?.shopName}
                                                        width={400}
                                                        height={190}
                                                        className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-2 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-bold">
                                                        <CiDiscount1 className='text-white text-lg' />FOODRUSH
                                                    </div>
                                                    {restaurant?.discount ? (
                                                        <div className="absolute top-10 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-semibold">
                                                            <CiDiscount1 className='text-white text-lg' /> {restaurant?.discount} tk off
                                                        </div>
                                                    ) : ""}
                                                    <div className="absolute bottom-2 right-2 bg-white text-sm   rounded-full px-2 py-1 flex items-center gap-1 ">
                                                        <Clock size={16} /> {restaurant?.deliveryTime} min
                                                    </div>
                                                    <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                                        <Heart size={16} className="text-gray-500 hover:text-[#e21b70]" />
                                                    </button>
                                                </div>
                                                <div className="p-4">
                                                    <div className='flex justify-between'>
                                                        <h3 className="font-bold text-[18px] text-gray-800 ">{restaurant?.shopName}</h3>
                                                        <div className="flex items-center gap-1 text-gray-800  px-2  rounded">
                                                            <Star size={16} className='text-[#ffb313]' /> {restaurant?.rating || 0} ({restaurant?.reviews || 0})
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-800 text-lg mb-2">{restaurant?.category}</p>

                                                    <p className="text-gray-800 text-lg mb-2">{restaurant?.deliveryCharge} tk</p>

                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>

                                ))}
                            </Swiper>
                        </div>

                    )}
                </section>

                {/* all restaurants products card */}
                <section className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">All Restaurants</h2>
                    {allRestaurant?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No restaurants found matching your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allRestaurant?.map((restaurant) => (
                                <div key={restaurant?._id}>
                                    <Link href={`/restaurants/allRestaurant/${restaurant?._id}`} >
                                        <div className="rounded-lg border overflow-hidden">
                                            <div className="relative group  overflow-hidden">
                                                <Image
                                                    src={restaurant?.shopPhoto}
                                                    alt={restaurant?.shopName}
                                                    width={400}
                                                    height={190}
                                                    className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-2 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-bold">
                                                    <CiDiscount1 className='text-white text-lg' />FOODRUSH
                                                </div>
                                                {restaurant?.discount ? (
                                                    <div className="absolute top-10 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-semibold">
                                                        <CiDiscount1 className='text-white text-lg' /> {restaurant?.discount} tk off
                                                    </div>
                                                ) : ""}
                                                <div className="absolute bottom-2 right-2 bg-white text-sm   rounded-full px-2 py-1 flex items-center gap-1 ">
                                                    <Clock size={16} /> {restaurant?.deliveryTime} min
                                                </div>
                                                <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                                    <Heart size={16} className="text-gray-500 hover:text-[#e21b70]" />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <div className='flex justify-between'>
                                                    <h3 className="font-bold text-[18px] text-gray-800 ">{restaurant?.shopName}</h3>
                                                    <div className="flex items-center gap-1 text-gray-800  px-2  rounded">
                                                        <Star size={16} className='text-[#ffb313]' /> {restaurant?.rating || 0} ({restaurant?.reviews || 0})
                                                    </div>
                                                </div>

                                                <p className="text-gray-800 text-lg mb-2">{restaurant?.category}</p>

                                                <p className="text-gray-800 text-lg mb-2">{restaurant?.deliveryCharge} tk</p>

                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AllRestaurants;