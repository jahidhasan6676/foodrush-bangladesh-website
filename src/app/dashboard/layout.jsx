import { AppSidebar } from "@/components/app-sidebar"
import DashboardNav from "@/components/dashboard-ui/DashboardNav";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function layout({children}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardNav/>
        <main>
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}