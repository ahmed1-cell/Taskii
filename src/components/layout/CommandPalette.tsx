"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  Timer,
  Zap
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useTaskiiStore } from "@/app/lib/store";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setDeepWorkMode, isDeepWorkMode } = useTaskiiStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard Overview</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/list"))}>
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Full Task List</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/tools/ai"))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Smart Helper</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/tools/pomodoro"))}>
            <Timer className="mr-2 h-4 w-4" />
            <span>Pomodoro Timer</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => setDeepWorkMode(!isDeepWorkMode))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Toggle Deep Work Mode</span>
            <CommandShortcut>⌘⇧D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Open Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}