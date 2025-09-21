
"use client";
import { MoreVertical, Settings, Star, MapPin } from "lucide-react";

const Orders = () => {
    return (
        <div className="w-11/12 mx-auto py-10">
            <div className=" border border-gray-300 rounded-md p-6">
                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800">Ongoing Order</h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Order #1</h3>
                        <p className="text-sm text-gray-500 mt-1">June 1, 2020, 08:22 AM</p>

                        {/* User Info */}
                        <div className="flex items-center gap-3 mt-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-medium text-gray-800">Ruby Roben</p>
                                <p className="text-sm text-gray-500">User since 2020</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Delivery Address</p>
                            <div className="flex items-start gap-2 mt-2">
                                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-800">Elm Street, 23</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Restaurant */}
                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-700">Fast Food Resto</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <Star className="w-4 h-4 text-orange-500" />
                                <span>5.0</span>
                                <span>•</span>
                                <span>1k+ Reviews</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                            </p>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-4 text-sm text-gray-700">
                            <div className="flex justify-between mb-2">
                                <p className="font-medium"> Delivery Time </p>
                                <p className="font-semibold">10 Min</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-medium">Distance </p>
                                <p className="font-semibold">2.5 Km</p>
                            </div>

                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="relative border-l border-l-gray-300 pl-6">
                        {/* Menu */}
                        <h3 className="text-lg font-semibold text-gray-700">Order Menu</h3>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.ibb.co/XJtVxCv/pizza.png"
                                    alt="Pizza"
                                    className="w-12 h-12 border rounded-md p-1"
                                />
                                <p className="text-gray-800 font-medium">Pepperoni Pizza x1</p>
                            </div>
                            <p className="text-orange-500 font-medium">+$5.59</p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.ibb.co/Dz3dMks/burger.png"
                                    alt="Pizza"
                                    className="w-12 h-12 border rounded-md p-1"
                                />
                                <p className="text-gray-800 font-medium">Pepperoni Pizza x1</p>
                            </div>
                            <p className="text-orange-500 font-medium">+$5.59</p>
                        </div>

                        {/* Payment */}
                        <div className="mt-14">
                            <p className="text-gray-400 text-[16px] font-medium">Payment Method</p>
                            <p className="text-lg font-bold text-gray-800">Cash</p>
                        </div>

                        {/* Total */}
                        <div className="mt-10">
                            <p className="text-gray-400 text-[16px] font-medium">Total</p>
                            <p className="text-orange-500 font-bold text-lg">$202.00</p>
                        </div>

                        {/* More Options */}
                        <div className="absolute top-0 right-0 flex gap-2">
                            <MoreVertical className="text-gray-600 cursor-pointer" />
                            <Settings className="text-orange-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;