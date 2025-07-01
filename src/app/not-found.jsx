"use client";

import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div>
            <h2>Not found page</h2>
            <Link href={"/"}>Back Home</Link>
        </div>
    );
};

export default NotFoundPage;