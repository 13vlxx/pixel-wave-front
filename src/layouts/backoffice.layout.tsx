import { BackofficeSidebar } from "@/components/custom/_utils/backoffice.sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export const BackofficeLayout = () => {
  return (
    <SidebarProvider>
      <BackofficeSidebar />
      <main className="p-6 px-2 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
