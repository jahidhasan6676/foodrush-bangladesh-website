import React from 'react';
import {
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, UserCircle, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardNav = () => {
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
                    <Button variant="outline" size="icon" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span>
                    </Button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/admin.png" alt="Admin" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium">Admin</p>
                            <p className="text-xs text-muted-foreground">admin@foodrush.com</p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardNav;