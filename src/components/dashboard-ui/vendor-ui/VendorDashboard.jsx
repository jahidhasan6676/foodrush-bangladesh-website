"user-client";
// app/seller/dashboard/page.js

import React from 'react';
import Head from 'next/head';
import {
  MdShoppingCart,
  MdAttachMoney,
  MdPeople,
  MdStar,
} from 'react-icons/md';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import useShopId from '@/components/client-hooks/useShopId';
import { TbCurrencyTaka } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// Sample data for charts
const lineChartData = [
  { name: 'Jan', sales: 12000 },
  { name: 'Feb', sales: 19000 },
  { name: 'Mar', sales: 15000 },
  { name: 'Apr', sales: 25000 },
  { name: 'May', sales: 22000 },
  { name: 'Jun', sales: 30000 },
];

const pieChartData = [
  { name: 'Delivered', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Cancelled', value: 10 },
];

const COLORS = ['#22c55e', '#facc15', '#ef4444'];

// Sample recent orders data
const recentOrders = [
  {
    id: '#1001',
    customer: 'John Doe',
    item: 'Burger Combo',
    status: 'Delivered',
    amount: '$25.99',
    date: '2025-09-18',
  },
  {
    id: '#1002',
    customer: 'Jane Smith',
    item: 'Pizza Margherita',
    status: 'Pending',
    amount: '$18.50',
    date: '2025-09-19',
  },
  {
    id: '#1003',
    customer: 'Mike Johnson',
    item: 'Salad Bowl',
    status: 'Delivered',
    amount: '$12.99',
    date: '2025-09-19',
  },
  {
    id: '#1004',
    customer: 'Sarah Wilson',
    item: 'Fried Rice',
    status: 'Cancelled',
    amount: '$15.00',
    date: '2025-09-18',
  },
  {
    id: '#1005',
    customer: 'Tom Brown',
    item: 'Tacos',
    status: 'Delivered',
    amount: '$22.50',
    date: '2025-09-19',
  },
];

const SellerDashboard = () => {
  const { data: session } = useSession();
  const { shopId } = useShopId();

  const { data: dashboardData = [], isLoading } = useQuery({
    queryKey: ["dashboardData", session?.user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/vendor/vendorDashboard?shopId=${shopId?.shopId}`);
      return res?.data;
    }
  })


  if(isLoading) return <h2>Loading...</h2>
  //console.log("shopID", shopId.shopId)
  ///console.log("dashboard data", dashboardData)

  return (
    <>
      <Head>
        <title>Seller Dashboard - FoodRush</title>
        <meta name="description" content="A modern and intuitive seller dashboard for FoodRush vendors to track orders, revenue, and performance." />
      </Head>
      <div className="w-11/12 mx-auto py-10">


        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Orders</p>
                <p className="text-4xl font-bold text-gray-900">{dashboardData?.stats?.totalOrders || 0}</p>
              </div>
              <MdShoppingCart className="h-10 w-10 text-indigo-500 opacity-80" />
            </div>
            <p className="text-xs text-green-600 mt-3">+12% from last month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Revenue</p>
                <p className="text-4xl font-bold text-gray-900">{dashboardData?.stats?.revenue || 0}</p>
              </div>
              <TbCurrencyTaka className="h-10 w-10 text-green-500 opacity-80" />
            </div>
            <p className="text-xs text-green-600 mt-3">+8% from last month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Pending Orders</p>
                <p className="text-4xl font-bold text-gray-900">{dashboardData?.stats?.pendingOrders || 0}</p>
              </div>
              <MdOutlinePending className="h-10 w-10 text-yellow-500 opacity-80" />
            </div>
            <p className="text-xs text-red-600 mt-3">-5 orders today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Completed Order</p>
                <p className="text-4xl font-bold text-gray-900">{dashboardData?.stats?.completedOrders || 0}</p>
              </div>
              <IoIosCheckmarkCircleOutline className="h-10 w-10 text-amber-500 opacity-80" />
            </div>
            <p className="text-xs text-green-600 mt-3">+8% from last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData?.lineChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData?.pieChart}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData?.recentOrders?.map((order) => (
                  <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id.slice(0, 5)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.amount} TK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date (order.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors">
              View All Orders →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
