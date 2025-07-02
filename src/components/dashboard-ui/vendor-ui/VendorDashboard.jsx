"use client";
import useRole from '@/components/client-hooks/useRole';
import React from 'react';

const VendorDashboard = () => {
    const {role,isLoading} = useRole();
    if(isLoading) return <h2>Loading...</h2>
    console.log("role:", role)
    return (
        <div>
            <h2 className='text-3xl font-semibold'> This is vendor dashboard page</h2>
        </div>
    );
};

export default VendorDashboard;