import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const FoodRushOverview = () => {
    return (
        <div className='w-11/12 mx-auto pb-20 '>
            {/* name */}
            <div className='flex justify-between mb-10'>
                <div>
                    <h2 className='text-2xl font-semibold md:font-bold text-[#ff2e87]'>FoodRush</h2>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="border border-[#ff2e87] hover:bg-[#ff2e87] text-[#ff2e87] hover:text-white p-2 rounded-md transition-colors">
                        <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a href="#" className="border border-[#ff2e87] hover:bg-[#ff2e87] text-[#ff2e87] hover:text-white p-2 rounded-md transition-colors">
                        <FaInstagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="border border-[#ff2e87] hover:bg-[#ff2e87] text-[#ff2e87] hover:text-white p-2 rounded-md transition-colors">
                        <FaTwitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="border border-[#ff2e87] hover:bg-[#ff2e87] text-[#ff2e87] hover:text-white p-2 rounded-md transition-colors">
                        <FaYoutube className="w-4 h-4" />
                    </a>
                </div>
            </div>
            {/* content */}
            <div>
                <h2 className='text-xl font-semibold mb-4 text-gray-900'>Order food from the best restaurants and shops with FoodRush Bangladesh</h2>
                <p className='text-[17px] text-gray-700'>Feeling hungry? Had a hectic day or just craving your favorite comfort food? Whether you’re at home, in the office, or stuck in traffic — FoodRush Bangladesh is here to deliver happiness right to your doorstep! From sizzling burgers to mouthwatering biryani, cheesy pizzas to fresh sushi — we’ve got it all! With over 2000+ partner restaurants and shops across Dhaka, Chittagong, Sylhet, and beyond, FoodRush brings the best of your city straight to your hands. Want to skip the grocery run? No problem! With FoodRush Shops, you can order daily essentials, meat, fresh produce, snacks, and much more from your favorite partners like Unimart, Shwapno, Bengal Meat, and more — all in one place.
                So why wait? Sit back, relax, and let FoodRush Bangladesh take care of your meals and groceries, while you enjoy the things that matter most.

                </p>
            </div>
        </div>
    );
};

export default FoodRushOverview;