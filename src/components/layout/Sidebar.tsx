
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
  Clock3,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'My Today', icon: Zap, href: '/dashboard/my-today' },
  { name: 'All Tasks', icon: CheckSquare, href: '/dashboard/list' },
  { name: 'Board', icon: Trello, href: '/dashboard/kanban' },
  { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
  { name: 'Timeline', icon: Clock3, href: '/dashboard/timeline' },
];

const analyticItems = [
  { name: 'Analytics', icon: PieChart, href: '/dashboard/analytics' },
  { name: 'Team Velocity', icon: Users, href: '/dashboard/members' },
];

const toolItems = [
  { name: 'Pomodoro', icon: Timer, href: '/dashboard/tools/pomodoro' },
  { name: 'AI Helper', icon: Sparkles, href: '/dashboard/tools/ai' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    workspaces, 
    activeWorkspaceId, 
    setActiveWorkspace, 
    isDeepWorkMode, 
    setDeepWorkMode,
    currentUser,
    clearAllData 
  } = useTaskiiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <aside className="w-64 border-r bg-card h-full" />;

  const handleLogout = () => {
    // Simulated logout as per Module 1
    router.push("/login");
  };

  return (
    <aside className={cn(
      "border-r bg-card flex flex-col h-full transition-all duration-500 overflow-hidden",
      isDeepWorkMode ? "w-16" : "w-64"
    )}>
      {/* Workspace Switcher */}
      <div className="p-4 border-b">
        <div className={cn("flex items-center gap-3 transition-opacity", isDeepWorkMode && "opacity-0")}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">T</div>
          <span className="font-bold text-lg tracking-tight">Taskii</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <p className={cn("text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2", isDeepWorkMode && "hidden")}>
            Workspaces
          </p>
          <div className="space-y-1">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => setActiveWorkspace(ws.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                  activeWorkspaceId === ws.id 
                    ? "bg-primary/10 text-primary font-bold shadow-sm" 
                    : "hover:bg-muted text-muted-foreground"
                )}
                title={ws.name}
              >
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: ws.color || '#6C5CE7' }} />
                <span className={cn("truncate", isDeepWorkMode && "hidden")}>{ws.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <p className={cn("text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2", isDeepWorkMode && "hidden")}>
            Menu
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" 
                    : "hover:bg-muted text-muted-foreground"
                )} title={item.name}>
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", pathname === item.href && "scale-110")} />
                  <span className={cn(isDeepWorkMode && "hidden")}>{item.name}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <p className={cn("text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2", isDeepWorkMode && "hidden")}>
            Productivity
          </p>
          <nav className="space-y-1">
            {toolItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                  pathname === item.href ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted text-muted-foreground"
                )} title={item.name}>
                  <item.icon className="h-5 w-5 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className={cn(isDeepWorkMode && "hidden")}>{item.name}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Profile */}
      <div className="mt-auto p-4 border-t bg-muted/20">
        <div className={cn("flex items-center justify-between mb-4", isDeepWorkMode && "flex-col gap-4")}>
          <div className={cn("flex items-center gap-2", !isDeepWorkMode && "text-primary")}>
            <Zap className="h-4 w-4" />
            <span className={cn("text-[10px] font-black uppercase tracking-widest", isDeepWorkMode && "hidden")}>Deep Work</span>
          </div>
          <Switch 
            checked={isDeepWorkMode}
            onCheckedChange={setDeepWorkMode}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {!isDeepWorkMode && (
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted transition-colors cursor-pointer group">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={`https://picsum.photos/seed/${currentUser?.id}/100/100`} />
                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0" onClick={() => router.push("/dashboard/settings")}>
                <p className="text-sm font-bold truncate">{currentUser?.name?.split(' ')[0]}</p>
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-tighter flex items-center gap-1">
                  <ShieldCheck className="h-2 w-2" /> Pro Architect
                </p>
              </div>
              <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
