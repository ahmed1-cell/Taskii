"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { NotificationManager } from "@/components/providers/NotificationManager";
import { Toaster } from "@/components/ui/toaster";
import { useTaskiiStore } from "@/app/lib/store";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { PomodoroTimer } from "@/components/tools/PomodoroTimer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDeepWorkMode } = useTaskiiStore();

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-all duration-700 ease-in-out font-body",
      isDeepWorkMode ? "bg-black" : "bg-background"
    )}>
      <NotificationManager />
      <Toaster />
      <CommandPalette />
      
      <div className={cn(
        "flex flex-1 overflow-hidden transition-all duration-500",
        isDeepWorkMode ? "p-0" : "p-0"
      )}>
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className={cn(
            "h-16 border-b transition-all duration-500",
            isDeepWorkMode ? "opacity-0 h-0 pointer-events-none" : "opacity-100 bg-white"
          )}>
            <Navbar />
          </header>
          
          <main className={cn(
            "flex-1 overflow-y-auto transition-all duration-700 custom-scrollbar",
            isDeepWorkMode ? "p-12 md:p-24" : "p-8"
          )}>
            <div className={cn(
              "max-w-7xl mx-auto space-y-8",
              isDeepWorkMode && "max-w-4xl"
            )}>
              {children}
            </div>
            {!isDeepWorkMode && <Footer />}
          </main>
        </div>
      </div>

      {/* Floating Pomodoro Widget */}
      <div className={cn(
        "fixed bottom-8 right-8 z-50 transition-all duration-500",
        isDeepWorkMode ? "scale-90" : "scale-100"
      )}>
        <PomodoroTimer isFloating />
      </div>
    </div>
  );
}
