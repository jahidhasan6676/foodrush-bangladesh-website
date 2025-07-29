import { useSession } from 'next-auth/react';
import React from 'react';

const AdminDashboard = () => {
    const { data: session } = useSession();

  console.log("User Role:", session?.user?.role);
    return (
        <div>
            admin dashboard
        </div>
    );
};

export default AdminDashboard;