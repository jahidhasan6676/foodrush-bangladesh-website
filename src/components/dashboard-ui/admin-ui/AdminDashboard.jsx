"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Check, CheckCircle, AlertCircle, HelpCircle, Settings } from "lucide-react"
import { TbCurrencyTaka } from "react-icons/tb";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axios.get("/api/adminDashboard");
      return res.data;
    },
  });

  const cards = [
    {
      label: "Total Order Complete",
      value: stats?.totalOrders,
      icon: Check,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Order Delivered",
      value: stats?.deliveredOrders,
      icon: CheckCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Order Canceled",
      value: stats?.canceledOrders,
      icon: AlertCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Order Pending",
      value: stats?.pendingOrders,
      icon: HelpCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Active Customer",
      value: stats?.activeCustomers,
      icon: HelpCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Active Riders",
      value: stats?.activeRiders,
      icon: HelpCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Shop",
      value: stats?.totalShops,
      icon: HelpCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];


  console.log("admin dashboard", stats)

  if (isLoading) return <h2>Loading...</h2>


  return (
    <div className="w-11/12 mx-auto py-10">

      <div className="grid grid-cols-12 gap-6">
        {/* income and withdraw */}
        <div className="col-span-8">
          <div className=" border border-gray-300 rounded-xl p-6 flex items-center justify-between  mx-auto mb-10">
            {/* Total Income Section */}
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-medium mb-1">Total Income</p>
              <p className="text-orange-500 text-3xl font-bold">{stats?.totalIncome} Tk</p>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-16 bg-gray-300 mx-8"></div>

            {/* Income Section */}
            <div className="flex-1">
              <p className="text-green-500 text-sm font-medium mb-1">Income</p>
              <p className="text-gray-800 text-xl font-semibold mb-2">{stats?.totalIncome}</p>
              <div className="flex items-center gap-1">
                <div className="bg-green-500 rounded-full p-1">
                  <ArrowUpIcon className="w-3 h-3 text-white" />
                </div>
                <span className="text-green-500 text-sm font-medium">+15%</span>
              </div>
            </div>

            {/* Withdraw Button */}
            <div className="ml-8">
              <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-3 rounded-lg font-medium">
                Withdraw 
              </button>
            </div>
          </div>

          <div className="bg-white  rounded-xl p-6 w-full">
            {/* <h2 className="text-xl font-semibold mb-4">
              📈 Monthly Orders & Income (Area Chart)
            </h2> */}
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={stats?.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Orders Area */}
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#4CAF50"
                  fill="#A5D6A7"
                  name="Orders"
                  fillOpacity={0.7}
                />

                {/* Income Area */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#5096ff"
                  fill="#aaccff"
                  name="Income"
                  fillOpacity={0.7}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-white rounded-xl border border-gray-300 p-6 ">
            {/* Stats list */}
            <div className="space-y-6 pr-12">
              {cards?.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className={`${stat.bgColor} rounded-md p-3 flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>

                    {/* Text content */}
                    <div className="flex-1">
                      <p className="text-gray-500 text-[15px] font-medium mb-1">{stat.label}</p>
                      <p className="text-gray-900 text-xl font-semibold">{stat.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AdminDashboard;