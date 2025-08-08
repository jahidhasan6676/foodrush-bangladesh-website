"use client";

import { imageUploadToImgbb } from "@/app/api/utils/imageUpload";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct() {
    //const  [selectImage,setSelectImage] = useState();
    const {data: session} = useSession();
   


    const handleAddProductSubmit = async(e) => {
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const price = form.price.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const photo = await imageUploadToImgbb(image);

        const productData = {
            productName,
            price,
            description,
            photo,
            status: "pending",
            owner: {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image
            }
        }
        //console.log("product data:", productData)

        try{
            const res = await axios.post("/api/addProduct", productData)
            console.log("product added:", res.data);
            toast.success(`${res?.data?.data?.productName} Successfully Added`)
            form.reset();
        }catch(error){
            console.log("error adding product:",error)
            toast.error("Something Wrong")
        }

        
    };

    

    return (
        <div className="w-11/12 max-w-5xl mx-auto py-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Add New Product</h2>
                <p className="text-gray-500 text-center mb-8">Fill in the details of your new product</p>

                <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Chicken Burger"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Price (৳)</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 250"
                            required
                        />
                    </div>
                  
                    {/* Description */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block font-medium text-gray-700">Product Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="Describe the product in detail..."
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block font-medium text-gray-700">Product Images</label>
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
                            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium text-lg shadow-md hover:shadow-lg">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}