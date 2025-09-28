'use client'
import React from 'react';


const FoodRushLoader = () => {
    return (
        <div className="w-4 h-4 relative flex items-center justify-center">
            {/* Base circle */}
            <div className="w-full h-full rounded-full border-2 border-gray-200 dark:border-gray-700" />

            {/* Rotating top border */}
            <div className="w-full h-full rounded-full border-2 border-transparent border-t-[#ff2e87] absolute top-0 left-0 animate-spin" />
        </div>
    );
};

export default FoodRushLoader;
