
"use client";

import { useEffect, useRef } from "react";
import { useTaskiiStore } from "@/app/lib/store";
import { useToast } from "@/hooks/use-toast";
import { isBefore, addHours, parseISO, isSameMinute } from "date-fns";

export function NotificationManager() {
  const { tasks } = useTaskiiStore();
  const { toast } = useToast();
  const notifiedTasks = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Request notification permission if not already granted
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    const checkDeadlines = () => {
      const now = new Date();
      
      tasks.forEach((task) => {
        if (task.status === 'done') return;
        
        const dueDate = parseISO(task.dueDate);
        
        // Notify if task is due within the next hour and hasn't been notified
        if (
          isBefore(dueDate, addHours(now, 1)) && 
          isBefore(now, dueDate) &&
          !notifiedTasks.current.has(task.id)
        ) {
          toast({
            title: "Deadline Approaching! ⏰",
            description: `"${task.title}" is due in less than an hour.`,
            variant: "default",
          });
          
          if (Notification.permission === "granted") {
            new Notification("Taskii Deadline", {
              body: `"${task.title}" is due soon!`,
              icon: "/favicon.ico",
            });
          }
          
          notifiedTasks.current.add(task.id);
        }
      });
    };

    const interval = setInterval(checkDeadlines, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks, toast]);

  return null;
}
