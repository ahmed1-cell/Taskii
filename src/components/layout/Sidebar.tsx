"use client";

import { useTaskiiStore } from "@/app/lib/store";
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
  Sparkles,
  Zap,
  Clock3
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'List View', icon: CheckSquare, href: '/dashboard/list' },
  { name: 'Kanban', icon: Trello, href: '/dashboard/kanban' },
  { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
  { name: 'Timeline', icon: Clock3, href: '/dashboard/timeline' },
  { name: 'Analytics', icon: PieChart, href: '/dashboard/analytics' },
];

const toolItems = [
  { name: 'Pomodoro', icon: Timer, href: '/dashboard/tools/pomodoro' },
  { name: 'AI Helper', icon: Sparkles, href: '/dashboard/tools/ai' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { workspaces, activeWorkspaceId, setActiveWorkspace, isDeepWorkMode, setDeepWorkMode } = useTaskiiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <aside className="w-64 border-r bg-card flex flex-col h-[calc(100vh-64px)]" />
  );

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-[calc(100vh-64px)] shrink-0">
      <div className="flex-1 overflow-y-auto">
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
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left",
                  activeWorkspaceId === ws.id 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <div className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  ws.isPersonal ? "bg-primary" : "bg-accent"
                )} />
                <span className="truncate">{ws.name}</span>
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
                  <item.icon className="h-4 w-4 shrink-0" />
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
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t space-y-4 bg-muted/20">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Deep Work</span>
          </div>
          <Switch 
            checked={isDeepWorkMode}
            onCheckedChange={setDeepWorkMode}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="space-y-1">
          <Link href="/dashboard/members">
            <span className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === '/dashboard/members' ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
            )}>
              <Users className="h-4 w-4 shrink-0" />
              Team Members
            </span>
          </Link>
          <Link href="/dashboard/settings">
            <span className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === '/dashboard/settings' ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
            )}>
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}