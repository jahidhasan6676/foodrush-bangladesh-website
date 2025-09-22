"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Boxes,
  ClipboardList,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  LogIn,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useRole from "./client-hooks/useRole";


const allNavItems = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    // {
    //   title: "All Users",
    //   url: "/dashboard/admin/allUsers",
    //   icon: ClipboardList,
    // },
    {
    title: "All Product",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Pending Product", url: "/dashboard/admin/pendingProducts" },
      { title: "Approved Product", url: "/dashboard/admin/approvedProducts" },
      { title: "Rejected Product", url: "/dashboard/admin/rejectedProducts" },
    ],
  },
    {
    title: "All Users",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Customers", url: "/dashboard/admin/customerList" },
      { title: "Vendors", url: "/dashboard/admin/shopList" },
      { title: "Riders", url: "/dashboard/admin/riderList" },
    ],
  },
   {
      title: "Vendor Request",
      url: "/dashboard/admin/vendorRequest",
      icon: ClipboardList,
    },
  ],

  vendor: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Add Shop",
      url: "/dashboard/vendor/addShop",
      icon: Boxes,
    },
    {
      title: "Add Product",
      url: "/dashboard/vendor/addProduct",
      icon: Plus,
    },
    {
      title: "My Product",
      url: "/dashboard/vendor/myProduct",
      icon: Boxes,
    },
    {
      title: "New Orders",
      url: "/dashboard/vendor/newOrders",
      icon: Boxes,
    },
    
    
  ],

  // customer: [
  //   {
  //     title: "Dashboard",
  //     url: "/dashboard",
  //     icon: SquareTerminal,
  //   },
  //   {
  //     title: "My Orders",
  //     url: "/dashboard/customer/myOrders",
  //     icon: ClipboardList,
  //   },
  // ],

  rider: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Orders",
      url: "/dashboard/rider/orders",
      icon: SquareTerminal,
    },
    {
      title: "Orders History",
      url: "/dashboard/rider/orderHistory",
      icon: SquareTerminal,
    },
  ],

  // common: [
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Bot,
  //     items: [
  //       { title: "Genesis", url: "#" },
  //       { title: "Explorer", url: "#" },
  //       { title: "Quantum", url: "#" },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: BookOpen,
  //     items: [
  //       { title: "Introduction", url: "#" },
  //       { title: "Get Started", url: "#" },
  //       { title: "Tutorials", url: "#" },
  //       { title: "Changelog", url: "#" },
  //     ],
  //   },
  // ],
};

const commonItems = [
  {
    title: "Profile",
    url: "/dashboard/allRole/profile",
    icon: User,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

const userData = {
  name: "FoodRush",
  email: "foodrush@gmail.com",
  avatar: "/avatars/shadcn.jpg",
};

const teams = [
  {
    name: "FoodRush",
    logo: GalleryVerticalEnd,
  },
];

export function AppSidebar(props) {
  const { role } = useRole();


  const roleItems = allNavItems[role.role] || [];


  const finalNav = [...roleItems, ...commonItems];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={finalNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

