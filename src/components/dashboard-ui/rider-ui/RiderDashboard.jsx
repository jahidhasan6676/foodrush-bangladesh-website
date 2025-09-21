"use client";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function RiderDashboard() {
    const [period, setPeriod] = useState("This Month");

    const data = [
        { name: "Mon", thisWeek: 60, lastWeek: 55 },
        { name: "Tue", thisWeek: 70, lastWeek: 65 },
        { name: "Wed", thisWeek: 80, lastWeek: 75 },
        { name: "Thu", thisWeek: 65, lastWeek: 85 },
        { name: "Fri", thisWeek: 90, lastWeek: 70 },
        { name: "Sat", thisWeek: 75, lastWeek: 60 },
        { name: "Sun", thisWeek: 95, lastWeek: 80 },
    ];

    return (
        <div className="w-11/12 mx-auto py-10 ">
            {/* Profile Section */}
            <div className="grid grid-cols-12 gap-6">

                <div className=" col-span-12 lg:col-span-5 rounded-xl border border-gray-300 p-5">
                    <div className="flex items-center gap-8">
                        <img
                            src="https://i.ibb.co/ZxY3F4x/profile.jpg"
                            alt="profile"
                            className="w-[140px] h-[140px] rounded-lg object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">Jordan Nico</h2>
                            <p className="text-sm text-gray-500 mt-3">⭐ 5.0 • 1k+ Reviews</p>
                            <p className="text-sm text-gray-400 mt-1">Join June 2020</p>
                            <button className="mt-3 px-4 py-2 bg-gray-100 rounded text-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center border border-gray-300 py-10 rounded-lg">
                            <p className="text-green-600  font-bold text-lg">932</p>
                            <p className="text-gray-500 text-sm">Finished</p>
                        </div>
                        <div className="text-center border border-gray-300 py-10 rounded-lg">
                            <p className="text-orange-500 font-bold text-lg">1,032</p>
                            <p className="text-gray-500 text-sm">Delivered</p>
                        </div>
                        <div className="text-center border border-gray-300 py-10 rounded-lg col-span-2">
                            <p className="text-red-500 font-bold text-lg">102</p>
                            <p className="text-gray-500 text-sm">Canceled</p>
                        </div>
                    </div>

                    {/* Earnings */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className=" text-center p-4 rounded-lg">
                            <p className="text-gray-500 text-sm">Today Earnings</p>
                            <p className="text-lg font-bold">$11.240</p>
                        </div>
                        <div className="bg-orange-100 text-center p-4 rounded-lg">
                            <p className="text-gray-500 text-sm">Today Earnings</p>
                            <p className="text-lg font-bold">$11.240</p>
                        </div>
                    </div>
                </div>

                <div className=" col-span-12 lg:col-span-7 flex flex-col w-full gap-6">

                    {/* Performance Cards */}
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full  gap-4 ">
                        <div className="flex flex-col items-center justify-center gap-2 border rounded-lg py-10">
                            <p>⏱</p>
                            <p className="font-semibold">50%</p>
                            <p className="text-sm text-gray-500">Performance</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 border rounded-lg py-10">
                                <p>📈</p>
                                <p className="font-semibold">80%</p>
                                <p className="text-sm text-gray-500">Min. Performance</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 border rounded-lg py-10">
                                <p>📊</p>
                                <p className="font-semibold">75%</p>
                                <p className="text-sm text-gray-500">Avg. Performance</p>
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-white rounded-xl w-full shadow p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-lg">Performance Statistic</h2>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Year</option>
                            </select>
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <p className="text-orange-500">This Week: 75%</p>
                            <p className="text-red-500">Last Week: 69%</p>
                            <p className="font-semibold">Avg Performance: 77%</p>
                        </div>

                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="thisWeek" stroke="#f97316" />
                                <Line type="monotone" dataKey="lastWeek" stroke="#ef4444" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
