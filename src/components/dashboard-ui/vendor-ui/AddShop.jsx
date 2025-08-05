"use client"
import { imageUploadToImgbb } from '@/app/api/utils/imageUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';

const AddShop = () => {

    const { data: session } = useSession();

    const handleAddShop = async (e) => {
        e.preventDefault();

        const form = e.target;

        const shopName = form.shopName.value;
        const discount = form.discount.value;
        const deliveryCharge = form.deliveryCharge.value;
        const deliveryTime = form.deliveryTime.value;
        const category = form.category.value;
        const location = form.location.value;
        const address = form.address.value;
        const image = form.image.files[0];
        const shopPhoto = await imageUploadToImgbb(image);

        const shopData = {
            shopName,
            discount,
            deliveryCharge,
            deliveryTime,
            category,
            location,
            address,
            shopPhoto,
            shopStatus: "pending",
            ownerInfo: {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image
            }
        }
        //console.log("product data:", productData)

        try {
            const res = await axios.post("/api/addShop", shopData)
            console.log("product added:", res.data.data);
            toast.success(`Shop Details Successfully Added`)
            form.reset();

        } catch (error) {
            //console.log("error adding shop:",error)
            toast.error("Something Wrong")
        }


    };
    return (
        <div className="w-11/12 max-w-5xl mx-auto py-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Add New Product</h2>
                <p className="text-gray-500 text-center mb-8">Fill in the details of your new product</p>

                <form onSubmit={handleAddShop} className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    {/* shop name */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            name="shopName"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Chicken Burger"
                            required
                        />
                    </div>


                    {/* Discount Price */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Discount <span className="text-gray-400 text-sm">(optional)</span></label>
                        <input
                            type="number"
                            name="discount"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 10%"
                        />
                    </div>

                    {/* Delivery Time */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Delivery Time (minutes)</label>
                        <input

                            name="deliveryTime"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 30 - 40 min"
                            required
                        />
                    </div>

                    {/* Delivery Charge */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Delivery Charge (৳) <span className="text-gray-400 text-sm">(optional)</span></label>
                        <input
                            type="number"
                            name="deliveryCharge"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 40 TK"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Food Category</label>
                        <select
                            name="category"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0 appearance-none" required >
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="drink">Drink</option>
                            <option value="dessert">Dessert</option>
                            <option value="biryani">Biryani</option>
                            <option value="burger">Burger</option>
                            <option value="juice">Juice</option>
                            <option value="cake">Cake</option>
                            <option value="cake">Coffee</option>
                        </select>
                    </div>


                    {/* shop location */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Shop Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Dhaka"
                            required
                        />
                    </div>

                    {/* Area */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Shop Address</label>
                        <input
                            type="text"
                            name="address"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Mirpur"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block font-medium text-gray-700">Shop Images</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer transition">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="pt-1 text-sm text-gray-500">Upload product images (click to browse)</p>
                                </div>
                                <input type="file" name="image" className="opacity-0" multiple />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium text-lg shadow-md hover:shadow-lg"
                        >
                            Add Shop
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddShop;