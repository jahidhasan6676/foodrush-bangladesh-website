// pages/profile.jsx
"use client"
import { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserProfile() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('orders');
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Rahim Khan',
        email: 'rahim@example.com',
        phone: '+880 1711 123456',
        address: '123/A, Gulshan Avenue, Dhaka 1212',
        profileImage: '/default-avatar.jpg'
    });

    const orders = [
        { id: '#FR-1001', date: '15 Aug 2023', items: 3, total: '৳650', status: 'Delivered' },
        { id: '#FR-1002', date: '10 Aug 2023', items: 5, total: '৳1,250', status: 'Delivered' },
        { id: '#FR-1003', date: '05 Aug 2023', items: 2, total: '৳450', status: 'Cancelled' }
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        setEditMode(false);
        // Here you would typically send the updated data to your backend
    };
    console.log("session", session)

    return (
        <div className="w-11/12 mx-auto">
            <Head>
                <title>My Profile | FoodRush</title>
                <meta name="description" content="Manage your FoodRush profile, orders, and favorites" />
            </Head>


            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Sidebar */}
                    <div className="md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-green-500 h-24 relative">
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                                        {session?.user?.image ? (
                                            <Image
                                                src={session?.user?.image}
                                                alt='profile'
                                                width={40}
                                                height={40}
                                                className='rounded-full w-full h-full'
                                            />
                                        ) : (
                                            <div>
                                                <div>
                                                    {session?.user?.name?.charAt(0) || "U"}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-16 pb-6 px-4 text-center">
                                <h2 className="text-xl font-bold text-gray-800">{session?.user?.name}</h2>
                                <p className="text-gray-600 mt-1">{session?.user?.email}</p>

                                {editMode ? (
                                    <div className="mt-6 space-y-4 text-left">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={profileData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profileData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <textarea
                                                name="address"
                                                value={profileData.address}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <div className="flex space-x-3 pt-2">
                                            <button
                                                onClick={handleSaveProfile}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditMode(false)}
                                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center justify-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {profileData.phone}
                                        </div>
                                        <div className="flex items-start justify-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-center">{profileData.address}</span>
                                        </div>
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md mt-6 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Orders</span>
                                    <span className="font-medium">24</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="font-medium">August 2025</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Favorite Cuisine</span>
                                    <span className="font-medium">Bangladeshi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/3 lg:w-3/4">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px">
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        My Orders
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('settings')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Settings
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'orders' && (
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order History</h2>
                                        <div className="space-y-4">
                                            {orders.map(order => (
                                                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">{order.id}</h3>
                                                            <p className="text-sm text-gray-500 mt-1">{order.date} • {order.items} items</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium">{order.total}</p>
                                                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                                                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                                            View Details
                                                        </button>
                                                        {order.status === 'Delivered' && (
                                                            <button className="ml-4 text-green-600 hover:text-green-800 text-sm font-medium">
                                                                Reorder
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'settings' && (
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
                                        <div className="space-y-6">
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <h3 className="font-medium text-gray-800 mb-3">Notification Preferences</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Order Updates</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Promotional Offers</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Newsletter</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <h3 className="font-medium text-gray-800 mb-3">Security</h3>
                                                <button className="text-green-600 hover:text-green-800 font-medium">
                                                    Change Password
                                                </button>
                                            </div>

                                            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                                                <h3 className="font-medium text-red-800 mb-3">Danger Zone</h3>
                                                <p className="text-red-600 text-sm mb-3">Deleting your account will remove all your data permanently.</p>
                                                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}