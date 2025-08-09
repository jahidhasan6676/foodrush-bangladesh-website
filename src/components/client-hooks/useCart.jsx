import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

const useCart = () => {

    const { data: session } = useSession();
    const { data: carts = [], isLoading, refetch } = useQuery({
        queryKey: ["carts", session?.user?.email],
        queryFn: async () => {
            const res = await axios.get("/api/cart", { params: { email: session?.user?.email } });
            return res?.data;
        }
    })
     return {carts,isLoading,refetch};

};

export default useCart;