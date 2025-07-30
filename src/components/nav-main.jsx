"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
  const pathname = usePathname(); // ✅ current path

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive =
            item.items &&
            item.items.some((subItem) => pathname.startsWith(subItem.url)); // submenu active check

          const isSingleActive = pathname === item.url; // single item active check

          return item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive}
              className="group/collapsible py-[4px]"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isParentActive ? "bg-muted" : ""}
                  >
                    {item.icon && <item.icon />}
                    <span className="text-[17px]">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = pathname === subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.url}
                              className={isSubActive ? "bg-muted" : ""}
                            >
                              <span className="text-[15px]">
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title} className="py-[4px]">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={isSingleActive ? "bg-muted" : ""}
              >
                <Link href={item.url} className="w-full flex items-center gap-2">
                  {item.icon && <item.icon />}
                  <span className="text-[17px]">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}


