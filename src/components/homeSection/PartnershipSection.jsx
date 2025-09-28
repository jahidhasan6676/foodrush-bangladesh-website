import React from "react";
import Image from "next/image";

const PartnershipSection = () => {
  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Restaurant Partner Card */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center bg-white rounded-lg p-3 transform transition duration-1000 hover:scale-102 hover:shadow-sm">
          <div className="">
            <Image
              src="/partner.webp" 
              alt="Restaurant partner"
              width={400}
              height={250}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              List Your Restaurant on Food!
            </h2>
            <p className="text-gray-600 mb-5">
              Would you like millions of new customers to enjoy your amazing food and groceries? 
              Let's start our partnership today!
            </p>
            <button className="bg-[#e21b70] cursor-pointer hover:bg-[#c01762] text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              Become a Partner
            </button>
          </div>
        </div>

        {/* Delivery Hero Card */}
        <div className=" flex flex-col md:flex-row gap-2 md:gap-8 items-center bg-white rounded-lg p-3 transform transition duration-1000 hover:scale-102 hover:shadow-sm">
          <div className=" ">
            <Image
              src="/rider.webp" 
              alt="Delivery hero"
              width={400}
              height={250}
              className="object-cover rounded-2xl "
            />
          </div>
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Become A Food! Hero
            </h2>
            <p className="text-gray-600 mb-5">
              Are you a man of speed and a master of navigation? Become a Food! Hero and 
              earn up to 25,000 TK each month while spreading joy to the doorsteps.
            </p>
            <button className="bg-[#e21b70] cursor-pointer hover:bg-[#c01762] text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              Become a Hero
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipSection;