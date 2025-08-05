"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const sampleData = [
    {
        id: 1,
        title: "Delicious Burger",
        category: "Fast Food",
        image: "/images/burger.jpg",
    },
    {
        id: 2,
        title: "Fresh Pizza",
        category: "Italian",
        image: "/images/pizza.jpg",
    },
    {
        id: 3,
        title: "Tasty Pasta",
        category: "Italian",
        image: "/images/pasta.jpg",
    },
    {
        id: 4,
        title: "Spicy Noodles",
        category: "Asian",
        image: "/images/noodles.jpg",
    },
    {
        id: 5,
        title: "Grilled Chicken",
        category: "BBQ",
        image: "/images/chicken.jpg",
    },
];

export default function Slider() {
    const swiperRef = useRef(null);




    const { data: allApprovedProducts, isLoading, refetch } = useQuery({
        queryKey: ["approvedProducts"],
        queryFn: async () => {
            const res = await axios.get("/api/approvedProduct")
            return res.data;
        }
    })

    useEffect(() => {
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");

        if (swiperRef.current) {
            nextBtn?.addEventListener("click", () => swiperRef.current.slideNext());
            prevBtn?.addEventListener("click", () => swiperRef.current.slidePrev());
        }
    }, []);

    return (
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

                        {searchRestaurant?.map((food) => (

                            <SwiperSlide key={food?._id}>
                                <Link href={`/restaurants/AllRestaurants/${food?._id}`} >
                                    <div className="rounded-lg border overflow-hidden">
                                        <div className="relative group  overflow-hidden">
                                            <Image
                                                src={food?.photo}
                                                alt={food?.productName}
                                                width={400}
                                                height={190}
                                                className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-bold">
                                                <CiDiscount1 className='text-white text-lg' />FOODRUSH
                                            </div>
                                            {food?.discountPrice ? (
                                                <div className="absolute top-10 left-2 flex gap-1 items-center bg-[#e21b70] text-white px-2 py-1 text-xs rounded-md font-semibold">
                                                    <CiDiscount1 className='text-white text-lg' /> {food?.discountPrice} tk off
                                                </div>
                                            ) : ""}
                                            <div className="absolute bottom-2 right-2 bg-white text-sm   rounded-full px-2 py-1 flex items-center gap-1 ">
                                                <Clock size={16} /> {food?.deliveryTime} min
                                            </div>
                                            <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                                <Heart size={16} className="text-gray-500 hover:text-[#e21b70]" />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <div className='flex justify-between'>
                                                <h3 className="font-bold text-[18px] text-gray-800 ">{food?.productName}</h3>
                                                <div className="flex items-center gap-1 text-gray-800  px-2  rounded">
                                                    <Star size={16} className='text-[#ffb313]' /> {food?.rating || 0} ({food?.reviews || 0})
                                                </div>
                                            </div>
                                            <p className="text-gray-800 text-lg mb-2">{food?.category}</p>
                                            <div className="flex items-center gap-2">
                                                {food?.discountPrice ? (
                                                    <>
                                                        <span className="font-semibold text-gray-700">
                                                            {food?.price - food?.discountPrice} tk
                                                        </span>
                                                        <span className="text-gray-500 text-sm ">
                                                            {food?.price} tk
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-gray-700">
                                                        {food?.price} tk
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>

            )}
        </section>
    );
}
