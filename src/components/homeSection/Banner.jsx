"use client"
import { bdLocations } from '@/bangladeshLocation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const Banner = () => {
    const [location, setLocation] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    const handleSearch = () => {
        if (location.trim()) {
            router.push(`/restaurants/allRestaurant?location=${location}`)
        }
    }


    const handleChange = (e) => {
        const value = e.target.value;
        setLocation(value)
        //console.log("value", value)

        if (value.length > 0) {
            const matches = bdLocations.filter((loc) =>
                loc?.name?.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matches.slice(0, 8));
        } else {
            setSuggestions([]);
        }
    }
    console.log("location", location)

    return (
        <div className="relative w-full min-h-[550px] bg-[#f7f7f7]">
            {/* Content Container */}
            <div className="w-11/12 mx-auto z-40 pt-10 lg:mt-0 lg:flex lg:items-center lg:min-h-[550px] relative overflow-visible">
                <div className="flex flex-col lg:flex-row gap-10 w-full">
                    {/* Left Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="max-w-lg relative">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#ff2e87]">
                                Hungry? FoodRush to the rescue!
                            </h1>
                            <p className="text-base md:text-lg mb-6 text-gray-600">
                                Order from your favorite restaurants with lightning-fast delivery.
                            </p>

                            {/* Search Bar */}
                            <div className="relative mb-6 md:mb-10 group space-y-3 md:space-y-4">
                                <div className="relative flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="pl-4 md:pl-5 text-gray-400">
                                        <FiMapPin className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={handleChange}
                                        placeholder="Where should we deliver?"
                                        className="w-full py-3 md:py-4 px-3 md:px-4 focus:outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-[#ff2e87] hidden cursor-pointer lg:flex hover:bg-[#e02679] text-white font-bold py-3 px-6 items-center transition duration-200">
                                        <FiSearch className="mr-2" />
                                        Search
                                    </button>
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="w-full lg:hidden rounded-md bg-[#ff2e87] hover:bg-[#e02679] text-white font-bold py-3 px-6 flex items-center justify-center transition duration-200 text-sm md:text-base">
                                    <FiSearch className="mr-2" />
                                    Search
                                </button>
                            </div>

                            {/* Suggestion Dropdown */}
                            {suggestions.length > 0 && (
                                <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-md z-40">
                                    <ul>
                                        {suggestions.map((s, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => {
                                                    setLocation(s.name);
                                                    setSuggestions([]);
                                                }}
                                            >
                                                <FiMapPin className="text-gray-500" /> {s.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="lg:absolute right-0 bottom-0 z-0 w-full lg:w-auto">
                <div className="relative w-full h-64 md:h-80 lg:h-[550px] lg:w-[600px] mx-auto lg:mx-0">
                    <Image
                        src="/hero.webp"
                        alt="Premium food delivery"
                        fill
                        className="object-contain object-bottom lg:object-bottom"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;

