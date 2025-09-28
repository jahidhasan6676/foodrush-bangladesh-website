"use client";
import React from 'react';
import {
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, UserCircle, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useRole from '../client-hooks/useRole';

const DashboardNav = () => {
    const { role } = useRole();
    const { data: session } = useSession();
    console.log("dashboard nav:", role)
    return (
        <div className="w-full sticky top-0 z-30 flex h-[56px] bg-[#fafafa] items-center gap-4 border-b ">
            <header className=" flex items-center gap-4 w-11/12 mx-auto">
                {/* Sidebar Trigger and Logo */}
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="h-8 w-8" />
                    <Separator orientation="vertical" className="h-6" />
                </div>

                {/* Search Bar */}
                <div className="relative ml-auto flex-1  max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search orders, customers..."
                        className="w-full rounded-lg bg-background pl-8"
                    />
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Button variant="outline" size="icon" className="relative cursor-pointer">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -right-1 -top-1 h-3 w-3  rounded-full bg-red-500"></span>
                    </Button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2">
                        <div className="">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt='profile'
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                            ) : (
                                <Avatar>
                                    <AvatarFallback>
                                        {session?.user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            )}

                        </div>
                        <div className="hidden md:block">
                            {role && <p className="text-sm font-medium">{role?.role}</p>}
                            {session?.user?.email && <p className="text-xs text-muted-foreground">{session?.user?.email}</p>}
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardNav;