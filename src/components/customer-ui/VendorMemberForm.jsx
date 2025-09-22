import React from 'react';

const VendorMemberForm = () => {
    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl p-8 my-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                📝 Vendor Request Form
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vendor Name */}
                <input
                    type="text"
                    name="name"

                    placeholder="Vendor Name"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87]"
                    required
                />
                {/* Vendor Email */}
                <input
                    type="email"
                    name="email"

                    placeholder="Vendor Email"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87]"
                    required
                />
                {/* Shop Name */}
                <input
                    type="text"
                    name="shopName"

                    placeholder="Shop Name"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87]"
                    required
                />
                {/* Category */}
                <input
                    type="text"
                    name="category"

                    placeholder="Category"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87]"
                    required
                />
                {/* Address */}
                <input
                    type="text"
                    name="address"

                    placeholder="Address"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87] md:col-span-2"
                    required
                />
                {/* Phone */}
                <input
                    type="text"
                    name="phone"

                    placeholder="Phone Number"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87]"
                    required
                />
                {/* Description */}
                <textarea
                    name="description"

                    placeholder="Description"
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-[#ff2e87] md:col-span-2"
                    rows={4}
                    required
                />
                {/* Submit Button */}
                <button
                    type="submit"
                    className="md:col-span-2 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default VendorMemberForm;