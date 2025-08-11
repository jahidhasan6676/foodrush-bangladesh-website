"use client";
import AllRestaurants from '@/components/restaurants-ui/AllRestaurants';
import React, { Suspense } from 'react';


function SearchBarFallback() {
  return <>Loading...</>
}


const AllRestaurantPage = () => {
    return (
        <div>
           <Suspense fallback={SearchBarFallback}>
             <AllRestaurants/>
           </Suspense>
        </div>
    );
};

export default AllRestaurantPage;