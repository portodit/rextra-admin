import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-slate-50/50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <AppSidebar 
        className="fixed left-0 top-0 z-50 hidden lg:flex" 
      />

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 z-50 lg:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AppSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[260px] transition-all duration-300">
        {/* Top Navbar */}
        <TopNavbar 
          className="sticky top-0 z-30" 
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
