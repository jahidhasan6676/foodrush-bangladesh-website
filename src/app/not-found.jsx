"use client"

import Image from "next/image";
import Link from "next/link";
import errorPic from "../../public/error-pic.svg"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">

            {/* Error Image */}
            <Image
            src={errorPic}
            alt="Error Pic"
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
            />
            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 mt-5 text-center">
                Something went wrong!
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                We’re deeply sorry. Please try to refresh the page or go to{" "}
                <Link href="/" className="text-blue-500 hover:underline">
                    Home page
                </Link>
                .
            </p>


        </div>
    );
};

export default NotFoundPage;