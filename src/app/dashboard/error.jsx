"use client";
import Link from 'next/link';
import React from 'react';

const DashboardErrorPage = () => {
    return (
        <div>
            <h2>Dashboard error page</h2>
            <Link href={"/dashboard"}>Back Dashboard</Link>
        </div>
    );
};

export default DashboardErrorPage;