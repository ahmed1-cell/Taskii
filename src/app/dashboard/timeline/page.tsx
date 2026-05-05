"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { format, differenceInDays, startOfMonth, endOfMonth, addDays, eachDayOfInterval } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function TimelinePage() {
  const { tasks } = useTaskiiStore();
  
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(addDays(today, 30));
  const days = eachDayOfInterval({ start, end });

  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-orange-500",
    high: "bg-red-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Timeline Roadmap</h1>
        <Badge variant="secondary" className="bg-primary/10 text-primary">Beta</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Delivery Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full whitespace-nowrap border-t">
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex border-b bg-muted/30">
                <div className="w-48 shrink-0 border-r p-3 font-semibold text-sm">Tasks</div>
                <div className="flex">
                  {days.map(day => (
                    <div key={day.toISOString()} className="w-12 shrink-0 p-2 text-center border-r text-[10px] flex flex-col items-center">
                      <span className="text-muted-foreground">{format(day, 'EEE')}</span>
                      <span className={cn(
                        "font-bold",
                        format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && "text-primary"
                      )}>{format(day, 'd')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {tasks.map(task => {
                  const dueDate = new Date(task.dueDate);
                  const startOffset = Math.max(0, differenceInDays(dueDate, start) - 3); // Simulated 3-day duration
                  const duration = 4; // Simulated duration for visualization
                  
                  return (
                    <div key={task.id} className="flex border-b group hover:bg-muted/10 transition-colors">
                      <div className="w-48 shrink-0 border-r p-3 text-xs font-medium truncate">
                        {task.title}
                      </div>
                      <div className="flex relative items-center py-2">
                        {days.map(day => (
                          <div key={day.toISOString()} className="w-12 shrink-0 border-r h-8 opacity-20" />
                        ))}
                        
                        {/* Task Bar */}
                        <div 
                          className={cn(
                            "absolute h-6 rounded-full shadow-sm flex items-center px-2 text-[9px] font-bold text-white transition-all cursor-pointer hover:scale-105",
                            priorityColors[task.priority]
                          )}
                          style={{ 
                            left: `${startOffset * 3}rem`, 
                            width: `${duration * 3}rem` 
                          }}
                        >
                          <span className="truncate">{task.title}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}