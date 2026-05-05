"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { NotificationManager } from "@/components/providers/NotificationManager";
import { Toaster } from "@/components/ui/toaster";
import { useTaskiiStore } from "@/app/lib/store";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDeepWorkMode } = useTaskiiStore();

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isDeepWorkMode && "bg-black")}>
      <NotificationManager />
      <Toaster />
      <CommandPalette />
      <div className={cn("transition-opacity duration-500", isDeepWorkMode ? "opacity-0 h-0 pointer-events-none" : "opacity-100 h-auto")}>
        <Navbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={cn("transition-all duration-500", isDeepWorkMode ? "w-0 opacity-0 pointer-events-none" : "w-64")}>
          <Sidebar />
        </div>
        <main className={cn(
          "flex-1 overflow-y-auto p-8 bg-background transition-all duration-500",
          isDeepWorkMode && "bg-black text-white p-20"
        )}>
          {children}
          {!isDeepWorkMode && <Footer />}
        </main>
      </div>
    </div>
  );
}