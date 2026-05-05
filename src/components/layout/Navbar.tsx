
"use client";

import { useState, useEffect } from "react";
import { useTaskiiStore } from "@/app/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Plus, Menu, LogOut, Settings, User } from "lucide-react";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Navbar() {
  const { currentUser, searchQuery, setSearchQuery, clearAllData } = useTaskiiStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <Link href="/dashboard" className="text-2xl font-bold text-primary tracking-tight font-headline">
          Taskii
        </Link>
      </div>

      <div className="flex-1 max-w-md px-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-muted border-none rounded-full text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={() => setIsModalOpen(true)} variant="default" className="hidden sm:flex rounded-full gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> New Task
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full border-2 border-white" />
        </Button>
        
        <div className="flex items-center gap-3 pl-2 border-l">
          {mounted && (
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">{currentUser?.name || "Guest"}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email || "guest@taskii.app"}</p>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 border shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src="https://picsum.photos/seed/taskii-user/100/100" />
                <AvatarFallback>{currentUser?.name?.charAt(0) || "G"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive cursor-pointer"
                onClick={clearAllData}
              >
                <LogOut className="mr-2 h-4 w-4" /> Reset Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CreateTaskModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </nav>
  );
}
