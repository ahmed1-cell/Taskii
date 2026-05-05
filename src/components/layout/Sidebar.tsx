"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Trello, 
  Calendar, 
  PieChart, 
  Timer, 
  Users, 
  Settings,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'List View', icon: CheckSquare, href: '/dashboard/list' },
  { name: 'Kanban', icon: Trello, href: '/dashboard/kanban' },
  { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
  { name: 'Analytics', icon: PieChart, href: '/dashboard/analytics' },
];

const toolItems = [
  { name: 'Pomodoro', icon: Timer, href: '/dashboard/tools/pomodoro' },
  { name: 'AI Helper', icon: Sparkles, href: '/dashboard/tools/ai' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useTaskiiStore();

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Workspaces
        </p>
        <div className="space-y-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                activeWorkspaceId === ws.id 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <div className={cn(
                "h-2 w-2 rounded-full",
                ws.isPersonal ? "bg-primary" : "bg-accent"
              )} />
              {ws.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Menu
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              )}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Productivity Tools
        </p>
        <nav className="space-y-1">
          {toolItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              )}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t space-y-1">
        <Link href="/dashboard/members">
          <span className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Users className="h-4 w-4" />
            Team Members
          </span>
        </Link>
        <Link href="/dashboard/settings">
          <span className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </span>
        </Link>
      </div>
    </aside>
  );
}