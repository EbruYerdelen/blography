import { MinimalIntegrationSidebar } from "@/components/integration-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full h-screen">
        <MinimalIntegrationSidebar />
        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
