"use client";
import React, { useState } from 'react';
import useCart from '../client-hooks/useCart';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Checkout = () => {
    const { data: session } = useSession();
    const { carts, isLoading } = useCart();

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "",
        phone: "",
        location: ""
    });
    console.log("cart", carts)
    if (isLoading) return <h2>Loading...</h2>

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
    };


    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        const isEmptyField = Object.values(deliveryInfo).some(value => value.trim() === "");

        if (isEmptyField) {
            toast.warn("Please fill in all delivery information fields.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }


        localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
        await handleSslPayment();


    };

    const price = carts?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const totalPrice = price + (carts[0]?.charge || 0);

    // //ssl commerce payment
    const handleSslPayment = async (e) => {
        const storedDeliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
        const paymentInfo = {
            email: session?.user?.email,
            name: session?.user?.name,
            price: totalPrice,
            cartIds: carts?.map(item => item?._id),
            productIds: carts?.map(item => item?.productId),
            shopId: carts[0]?.shopId,
            transactionId: "",
            date: new Date(),
            status: 'Pending',
            deliveryInfo: storedDeliveryInfo,
            method: "SSLCommerce",
            payment: "pending",
        }

        const response = await axios.post("/api/create-ssl-payment", paymentInfo)
        console.log("response info", response)
        const gatewayUrl = response?.data?.gatewayUrl;
        if (gatewayUrl) {
            window.location.href = gatewayUrl;
        } else {
            console.error("Gateway URL missing:", response?.data);
            alert("Payment gateway URL not found.");
        }
    }


    return (
        <div className=" bg-gray-100">
            <div className='w-11/12 mx-auto py-10'>
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Delivery Information Form */}
                    <div className="bg-white max-w-lg rounded-md p-3 md:p-6 lg:p-10">
                        <h2 className="text-2xl font-medium uppercase ">
                            DELIVERY INFORMATION </h2>

                        <form className="mt-6 space-y-4 flex flex-col">
                            <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="input-field" required />
                            <input type="number" name="phone" value={deliveryInfo.phone} onChange={handleInputChange} placeholder="Phone" className="input-field" required />
                            <input type="text" name="location" value={deliveryInfo.city} onChange={handleInputChange} placeholder="Location" className="input-field" required />
                        </form>
                    </div>

                    {/* Cart Totals and Payment Method */}
                    <div className="">
                        <div className="flex justify-end">
                            <div className="max-w-lg w-full bg-white p-3 md:p-6 lg:p-10">
                                <h2 className="text-2xl font-medium uppercase mb-8">
                                    your items
                                </h2>
                                <div className="flex justify-between mb-3">
                                    <span>Subtotal</span>
                                    <span>{price?.toFixed()} TK</span>
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
                                    <button onClick={handlePlaceOrder} disabled={carts?.length === 0} className="cursor-pointer mt-4 bg-black text-sm text-white py-3 px-8 w-fit disabled:cursor-not-allowed disabled:opacity-50">
                                        PLACE ORDER
                                    </button>
                                </div>

                                {/* Message for Empty Cart */}
                                {carts?.length === 0 && (
                                    <p className="text-center text-gray-500 mt-4">Add some products to your cart to proceed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;