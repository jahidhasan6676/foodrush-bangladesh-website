import React from "react";
import { SiFoodpanda } from "react-icons/si";

const FeatureSection = () => {
  return (
    <div className=" pb-20">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Feature 1: Super Fast Delivery */}
        <div className=" flex flex-col items-center text-center">
          <div className="mb-4 rounded-full">
            <img 
              src="/bike.svg" 
              alt="Fast Delivery" 
              className="w-[200px] h-[100px] " 
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Super fast Delivery
          </h3>
          
          <p className="text-[17px] text-gray-800">
            Faster than your savings can blink. Experience the super-fast delivery and get fresh food.
          </p>
        </div>

        {/* Feature 2: Live Order Tracking */}
        <div className=" flex flex-col items-center text-center">
          <div className="mb-4  rounded-full">
            <img 
              src="/location.svg" 
              alt="Order Tracking" 
              className="w-[200px] h-[100px] " 
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900  mb-2">
            Live Order Tracking
          </h3>
          <p className="text-[17px] text-gray-800">
            Track your order while it is delivered to your doorstep from the restaurant.
          </p>
        </div>

        {/* Feature 3: Favorite Restaurants */}
        <div className=" flex flex-col items-center text-center">
          <div className="mb-4  rounded-full">
            <img 
              src="/mobile.svg" 
              alt="Restaurants" 
              className="w-[200px] h-[100px] " 
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900  mb-2">
            Your Favorite Restaurants
          </h2>
          <p className="text-[17px] text-gray-800">
            Find the best and nearest top your favorite restaurants from your selected location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;