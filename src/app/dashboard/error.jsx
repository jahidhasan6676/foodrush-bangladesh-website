"use client";
import Link from 'next/link';
import React from 'react';

const DashboardErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-10 max-w-md text-center">
                {/* Error Icon */}
                <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h1>
                
                {/* Subtext */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We couldn’t load your dashboard. Please try again or go back to the main dashboard.
                </p>

                {/* Back Button */}
                <Link href="/dashboard" className="inline-block px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-colors">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default DashboardErrorPage;
