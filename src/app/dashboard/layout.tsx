
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { NotificationManager } from "@/components/providers/NotificationManager";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NotificationManager />
      <Toaster />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
          <footer className="mt-12 py-6 border-t text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Taskii Productivity Suite. All rights reserved.</p>
            <p className="mt-1 font-medium text-primary">Developed by Muhammad Ahmed</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
