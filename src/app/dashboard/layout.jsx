
import Sidebar from '@/components/dashboard-ui/Sidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div>
            {/* sidebar */}
            <Sidebar/>

            {/* main content */}
            <div className='lg:ml-64'>
                {/* page content */}
                <div className='bg-[#f0f3fb] min-h-[calc(100vh-61px)]'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;





