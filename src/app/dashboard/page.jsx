"use client";
import useRole from '@/components/client-hooks/useRole';
import AdminDashboard from '@/components/dashboard-ui/admin-ui/AdminDashboard';
import RiderDashboard from '@/components/dashboard-ui/rider-ui/RiderDashboard';
import VendorDashboard from '@/components/dashboard-ui/vendor-ui/VendorDashboard';
import React from 'react';

const Dashboard = () => {
  const { role,isLoading } = useRole();
  if(isLoading) return <h2>Loading...</h2>
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
