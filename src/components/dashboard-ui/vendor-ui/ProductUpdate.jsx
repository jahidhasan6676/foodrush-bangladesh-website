"use client";
import { imageUploadToImgbb } from '@/app/api/utils/imageUpload';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const ProductUpdate = () => {
    const { data: session } = useSession();
    const { id } = useParams();
    //console.log(id)

    const { data: product = {}, isLoading, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const data = await axios.get(`/api/addProduct/${id}`)
            return data.data;
        }
        
    })
    //console.log("single data", product)

    const handleProductUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const price = form.price.value;
        const discountPrice = form.discountPrice.value;
        const quantity = form.quantity.value;
        const deliveryCharge = form.deliveryCharge.value;
        const deliveryTime = form.deliveryTime.value;
        const category = form.category.value;
        const division = form.division.value;
        const district = form.district.value;
        const area = form.area.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const photo = await imageUploadToImgbb(image);

        const updateProductData = {
            productName,
            price,
            discountPrice,
            quantity,
            deliveryCharge,
            deliveryTime,
            category,
            division,
            district,
            area,
            description,
            photo,
            status: "pending",
            ownerInfo: {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image
            }
        }

        if(!photo){
            return toast.error("Please update photo")
        }
        //console.log("product data:", updateProductData)
         try{
            const res = await axios.put(`/api/addProduct/${id}`, updateProductData);
             console.log("update data", res.data);
             if(res.status === 200){
                toast.success("Product Successfully Update")
                refetch();
             }
         }catch(error){
            console.log("error", error)
            toast.error("Something Wrong")
         }
    }

    if(isLoading) return <h2>Loading...</h2>
    return (
        <div className="w-11/12 max-w-5xl mx-auto py-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Update Product</h2>
                <form onSubmit={handleProductUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            defaultValue={product?.productName}
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
                            defaultValue={product?.price}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 250"
                            required
                        />
                    </div>

                    {/* Discount Price */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Discount Price (৳) <span className="text-gray-400 text-sm">(optional)</span></label>
                        <input
                            type="number"
                            name="discountPrice"
                            defaultValue={product?.discountPrice}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 200"
                        />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Available Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            defaultValue={product?.quantity}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 50"
                            required
                        />
                    </div>

                    {/* Delivery Time */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Delivery Time (minutes)</label>
                        <input
                            type="number"
                            name="deliveryTime"
                            defaultValue={product?.deliveryTime}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 30"
                            required
                        />
                    </div>

                    {/* Delivery Charge */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Delivery Charge (৳) <span className="text-gray-400 text-sm">(optional)</span></label>
                        <input
                            type="number"
                            name="deliveryCharge"
                            defaultValue={product?.deliveryCharge}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. 40"
                        />
                    </div>

                    {/* Category */}
                    {product?.category &&
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Main Category</label>
                            <select
                                name="category"
                                defaultValue={product?.category}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0 appearance-none" required >
                                <option value="">Select Category</option>
                                <option value="food">Food</option>
                                <option value="drink">Drink</option>
                                <option value="dessert">Dessert</option>
                                <option value="biryani">Biryani</option>
                                <option value="burger">Burger</option>
                                <option value="juice">Juice</option>
                                <option value="cake">Cake</option>
                            </select>
                        </div>
                    }

                    {/* Location Division */}
                    {product?.division &&
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Division</label>
                            <select
                                name="division"
                                defaultValue={product?.division}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0 appearance-none" required >
                                <option value="">Select Division</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="chattogram">Chattogram</option>
                                <option value="khulna">Khulna</option>
                            </select>
                        </div>}

                    {/* District */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">District</label>
                        <input
                            type="text"
                            name="district"
                            defaultValue={product?.district}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Dhaka"
                            required
                        />
                    </div>

                    {/* Area */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Area / Upazila</label>
                        <input
                            type="text"
                            name="area"
                            defaultValue={product?.area}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-0"
                            placeholder="e.g. Mirpur"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block font-medium text-gray-700">Product Description</label>
                        <textarea
                            name="description"
                            defaultValue={product?.description}
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
                                    <input type="file" name="image"  className="opacity-0" multiple />
                                </label>
                            </div>
                        </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium text-lg shadow-md hover:shadow-lg">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdate;