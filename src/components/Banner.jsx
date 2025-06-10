"use client"
import Image from 'next/image';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const Banner = () => {
    return (
        <div className="relative w-full h-[550px] bg-[#f7f7f7] overflow-hidden">
            {/* Left Content Container */}
            <div className="w-11/12 mx-auto h-full flex items-center relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 w-full">
                    {/* Left Side - Text & Search */}
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
                        <div className="max-w-lg">
                            <div className="flex items-center mb-6">
                                <div className="text-[#ff2e87] border-2 border-[#ff2e87] font-bold px-4 py-1 rounded-full text-sm tracking-wider">
                                    PREMIUM DELIVERY
                                </div>
                            </div>

                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#ff2e87' }}>
                                Hungry? FoodRush to the rescue!
                            </h1>
                            <p className="text-lg mb-6 text-gray-600">
                                Order from your favorite restaurants with lightning-fast delivery.
                            </p>

                            {/* Search Bar */}
                            <div className="relative mb-10 group space-y-4">
                                <div className="relative flex items-center bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                    <div className="pl-5 text-gray-400">
                                        <FiMapPin className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Where should we deliver?"
                                        className="w-full py-4 px-4 focus:outline-none text-gray-700 placeholder-gray-400" />

                                    <button
                                        className="bg-[#ff2e87] hidden hover:bg-[#e02679] text-white font-bold py-3 px-6 lg:flex items-center transition duration-200">
                                        <FiSearch className="mr-2" />
                                        Search
                                    </button>
                                </div>
                                <button
                                    className="w-full lg:hidden rounded-md bg-[#ff2e87] hover:bg-[#e02679] text-white font-bold py-3 px-6 flex items-center justify-center transition duration-200">
                                    <FiSearch className="mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Image Fixed to Bottom-Right */}
            <div className="absolute right-0 bottom-0 z-0 ">
                <Image
                    src="/hero.webp"
                    alt="Premium food delivery"
                    width={600}
                    height={550}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default Banner;

