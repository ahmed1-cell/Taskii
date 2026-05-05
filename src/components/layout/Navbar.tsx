"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Plus, Menu } from "lucide-react";

export function Navbar() {
  const { currentUser } = useTaskiiStore();

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-primary tracking-tight font-headline">
          Taskii
        </h1>
      </div>

      <div className="flex-1 max-w-xl px-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, goals..."
            className="w-full h-10 pl-10 pr-4 bg-muted border-none rounded-full text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="default" className="hidden sm:flex rounded-full gap-2">
          <Plus className="h-4 w-4" /> New Task
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full border-2 border-white" />
        </Button>
        <div className="flex items-center gap-3 pl-2 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
          </div>
          <Avatar className="h-9 w-9 border shadow-sm">
            <AvatarImage src="https://picsum.photos/seed/taskii-user/100/100" />
            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}