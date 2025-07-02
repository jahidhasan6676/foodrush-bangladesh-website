"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useRole = () => {
    const {data: session} = useSession();
    const {data: role = {}, isLoading, refetch, error} = useQuery({
        queryKey: ["role", session?.user?.email],
        queryFn: async()=>{
            const res = await axios.get(`/api/userRole?email=${session?.user?.email}`);
            return res?.data;
        }
    })

    return {role,isLoading,refetch,error};
};

export default useRole;