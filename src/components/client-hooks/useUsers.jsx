
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUsers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["usersByRole"],
        queryFn: async () => {
            const res = await axios.get("/api/allUsers");
            return res.data;
        },
    });

    return {customers: data?.customers, vendors: data?.vendors, riders: data?.riders, isLoading};
};

export default useUsers;