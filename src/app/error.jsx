"use client";

import Link from "next/link";

const ErrorPage = () => {
    return (
        <div>
            <h2>Error page</h2>
            <Link href={"/"}>Back Home</Link>
        </div>
    );
};

export default ErrorPage;