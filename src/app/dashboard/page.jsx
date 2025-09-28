"use client";
import useRole from '@/components/client-hooks/useRole';
import AdminDashboard from '@/components/dashboard-ui/admin-ui/AdminDashboard';
import RiderDashboard from '@/components/dashboard-ui/rider-ui/RiderDashboard';
import VendorDashboard from '@/components/dashboard-ui/vendor-ui/VendorDashboard';
import FoodRushLoader from '@/components/loadingSpinner/FoodRushLoader';
import React from 'react';

const Dashboard = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <FoodRushLoader/>
    </div>
  );

  return (

    <>

      <>
        {role.role === "vendor" && <VendorDashboard />}
      </>

      <>
        {role.role === "rider" && <RiderDashboard />}
      </>

      <>
        {role.role === "admin" && <AdminDashboard />}
      </>

    </>




  );
};

export default Dashboard;
