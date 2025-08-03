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
        <div className="relative max-w-7xl mx-auto px-4 py-10">
            {/* Navigation Buttons */}
            <button
                id="prevBtn"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
                <ChevronLeft />
            </button>
            <button
                id="nextBtn"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
                <ChevronRight />
            </button>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {allApprovedProducts?.map((item) => (
                    <SwiperSlide key={item._id}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <Image
                                src={item?.photo}
                                alt={item?.productName}
                                width={400}
                                height={250}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.productName}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
