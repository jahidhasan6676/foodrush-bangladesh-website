"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import useCart from '../client-hooks/useCart';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const Cart = () => {
    const queryClient = useQueryClient();
    const { carts, isLoading, refetch } = useCart();
    const { data: session } = useSession();


    const handleDeleteCartItem = async (id) => {
        const res = await axios.delete(`/api/cart/`, { data: { productId: id } })
        //console.log("delete:", res.data)
        if (res.status === 200) {
            toast.success("Cart item delete")
            queryClient.invalidateQueries(["carts", session?.user?.email]);
            
        }
    }

    if (isLoading) return <h2>Loading...</h2>
    //console.log("all cart data", carts[0].charge)

    const totalQuantity = carts.reduce((acc, item) => acc + item.quantity, 0);
    //const charge = carts.map((acc, item) => acc + item.quantity, 0);
    const price = carts?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const totalPrice = price + (carts[0]?.charge || 0);
    return (
        <div className="w-11/12 mx-auto py-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {carts?.length > 0 ? (
                    carts?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                            <div className="flex gap-4">
                                <div className='w-[150px] h-[150px]'>
                                    <Image
                                        src={item?.photo}
                                        alt='product picture'
                                        width={110}
                                        height={250}
                                        className='rounded-sm object-cover w-full h-full'
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-1"> {item?.quantity} <RxCross2 className='font-bold text-[12px]' /> {item?.productName}</h2>
                                    <p className="text-lg font-semibold mb-2 text-gray-800">Price: {item?.price * item?.quantity} TK</p>
                                    <p className="text-gray-800">Unit: ${item?.price}</p>
                                </div>
                            </div>
                            <div onClick={() => handleDeleteCartItem(item?._id)} className="text-right">
                                <RxCross2 className='text-2xl cursor-pointer' />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Your cart is empty</p>
                )}
            </div>

            {/* Summary Box */}
            {/* Total Price and Payment Section (Always Visible) */}
            <div className="pt-10">
                <div className="flex justify-end">
                    <div className="max-w-lg w-full bg-gray-50 p-3 md:p-6 lg:p-10">
                        <h2 className="text-2xl font-medium uppercase mb-8">
                            your items
                        </h2>
                        <div className="flex justify-between mb-3">
                            <span>Subtotal</span>
                            <span>{price.toFixed()} TK</span>
                        </div>
                        <hr className="mb-3" />
                        <div className="flex justify-between mb-3">
                            <span>Shipping Fee</span>
                            <span>{carts[0]?.charge || 0} TK</span>
                        </div>
                        <hr className="mb-3" />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{totalPrice} TK</span>
                        </div>

                        {/* Checkout Button */}
                        <div className="flex justify-end ">
                            <Link href={"/checkout"}>
                                <button disabled={carts?.length === 0} className="cursor-pointer mt-4 bg-black text-sm text-white py-3 px-8 w-fit disabled:cursor-not-allowed disabled:opacity-50">
                                    PROCEED TO CHECKOUT
                                </button>
                            </Link>
                        </div>

                        {/* Message for Empty Cart */}
                        {carts?.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">Add some products to your cart to proceed.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;