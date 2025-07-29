import { useSession } from 'next-auth/react';
import React from 'react';

const CustomerDashboard = () => {
    const { data: session } = useSession();
    
      console.log("User Role:", session?.user?.role);
    return (
        <div>
            <h2>Customer dashboard</h2>
        </div>
    );
};

export default CustomerDashboard;