"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/Providers/NextAuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
               
                <Navbar />
                <div className="min-h-[calc(100vh-602px)]">
                    {children}
                    <ToastContainer />
                </div>
                <Footer />
            </QueryClientProvider>
        </NextAuthProvider>
    );
}