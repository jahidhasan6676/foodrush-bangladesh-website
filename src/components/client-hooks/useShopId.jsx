import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

const useShopId = () => {
    const {data: session} = useSession();
    // vendor shop id get
    const { data: shopId = [], isLoading } = useQuery({
        queryKey: ["shopId", session?.user?.email],
        queryFn: async () => {
            const res = await axios.get(`/api/vendor/shop?email=${session?.user?.email}`);
            return res?.data;
        }
    })
    return {shopId};
};

export default useShopId;