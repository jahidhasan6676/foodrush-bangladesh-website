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
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const SingleRestaurant = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const params = useParams();
    const { id } = params;
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    const [totalCount, setTotalCount] = useState(1);
    const { data: session } = useSession();

    const { data: restaurantData, isLoading } = useQuery({
        queryKey: ['singleRestaurant', id],
        queryFn: async () => {
            const res = await axios.get(`/api/restaurant/allRestaurants/${id}`);
            return res.data;
        },
    });

    const restaurant = restaurantData?.shop;
    const products = restaurantData?.products;
    //console.log("products", products)


    if (isLoading) return <h2>Loading...</h2>;
    // if (!restaurant) return <h2>No restaurant found.</h2>
    //console.log("shop products", restaurantData)

    const handleIncrement = () => {
        setTotalCount(totalCount + 1)
    }

    const handleDecrement = () => {
        if (totalCount > 1) {
            setTotalCount(totalCount - 1)
        }
    }

    // cart add dash
    const handleAddCart = async(product) => {
        //console.log("id", product)
        if (!session?.user?.email) {
            return toast.error("Please Login First");
        }

        const cartData = {
            productId: product?._id,
            productName: product?.productName,
            price: restaurantData?.shop?.discount > 0
                ? product.price - (product.price * restaurantData?.shop?.discount / 100)
                : product.price,
            quantity: totalCount,
            ownerEmail: restaurant?.ownerInfo?.email,
            customerEmail: session?.user?.email,
            photo: product.photo
        }
        

        try {
            const res = await axios.post("/api/cart", cartData);
            console.log(res)
            if (res.status === 201) {
                toast.success("Added to cart successfully!");
                setSelectedProduct(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart");
        }
    
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
            <div className='py-3 '>
                <h2 className='text-xl font-semibold'>Products</h2>
            </div>

            {/* product and cart */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {products?.map((product) => {
                    const discountPercent = restaurantData?.shop?.discount || 0;
                    const discountPrice = product?.price - (product?.price * discountPercent / 100);

                    return (
                        <div key={product?._id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
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
            <div className="fixed inset-0  bg-gray-50/80 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white max-w-md border rounded-lg relative">
                    <button
                        className="absolute top-2 right-2 rounded-full w-[30px] h-[30px] bg-white hover:text-red-500 text-[16px] items-center"
                        onClick={() => setSelectedProduct(null)}
                    >
                        ✕
                    </button>
                    <div className='w-full h-[250px]'>
                        <Image
                            src={selectedProduct?.photo}
                            alt='product picture'
                            width={110}
                            height={250}
                            className='rounded-sm object-cover w-full h-full'
                        />
                    </div>
                    <div className='p-5'>
                        <h2 className="text-lg font-medium mb-5 mt-5">{selectedProduct.productName}</h2>
                        <p className='font-medium text-gray-600'>{selectedProduct?.description}</p>
                        <p className="text-gray-700 mt-5">
                            {restaurantData?.shop?.discount > 0 && (
                                <>
                                    Tk {selectedProduct.price - (selectedProduct.price * restaurantData?.shop?.discount / 100)}
                                </>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center border-t p-5 gap-3">
                        <button onClick={handleDecrement}
                            disabled={totalCount === 1}
                            className={`bg-orange-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-white w-8 h-8 flex items-center justify-center rounded-full`}>-</button>
                        <span>{totalCount}</span>

                        <button onClick={handleIncrement} className="bg-orange-500 cursor-pointer text-white w-8 h-8 flex items-center justify-center rounded-full">+</button>

                        <button onClick={() => {handleAddCart(selectedProduct); setSelectedProduct(null)}} className="bg-orange-500 text-white cursor-pointer flex-1 py-2 rounded">Add to cart</button>
                    </div>

                </div>
            </div>
        )}

    </div>
);
};

export default SingleRestaurant;
