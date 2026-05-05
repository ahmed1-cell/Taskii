"use client";

import { Task } from "@/app/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Trash2, Edit3, MoreVertical, ChevronRight, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isToday, isPast } from "date-fns";
import { useTaskiiStore } from "@/app/lib/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { TaskDetailPanel } from "./TaskDetailPanel";

interface TaskCardProps {
  task: Task;
  viewMode?: 'kanban' | 'list';
}

export function TaskCard({ task, viewMode = 'kanban' }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskiiStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const priorityColors = {
    urgent: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-blue-500 text-white",
    low: "bg-slate-400 text-white",
  };

  const completedSubtasks = task.subTasks.filter(st => st.completed).length;
  const isOverdue = isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'done';

  return (
    <>
      <Card 
        onClick={() => setIsDetailOpen(true)}
        className={cn(
          "hover:shadow-2xl transition-all duration-300 cursor-pointer group border-l-4 overflow-hidden",
          task.status === 'done' ? "opacity-60" : "opacity-100",
          task.priority === 'urgent' ? "border-l-red-500" : "border-l-transparent"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={cn("h-2.5 w-2.5 rounded-full", priorityColors[task.priority])} />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {task.priority}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-lg">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setIsDetailOpen(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" /> Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive gap-2 font-bold">
                  <Trash2 className="h-4 w-4" /> Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-3 mb-3">
            <Checkbox 
              checked={task.status === 'done'} 
              onCheckedChange={() => updateTask(task.id, { 
                status: task.status === 'done' ? 'todo' : 'done',
                completedAt: task.status === 'done' ? undefined : new Date().toISOString()
              })}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 h-5 w-5 rounded-md border-2"
            />
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-bold text-sm mb-1 leading-tight group-hover:text-primary transition-colors",
                task.status === 'done' && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {task.subTasks.length > 0 && (
            <div className="mb-4 pl-8">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-1.5">
                <span>PROGRESS</span>
                <span>{completedSubtasks}/{task.subTasks.length}</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${(completedSubtasks / task.subTasks.length) * 100}%` }} 
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                isOverdue ? "text-red-600 bg-red-50" : "text-muted-foreground bg-muted"
              )}>
                <Calendar className="h-3 w-3" />
                {format(new Date(task.dueDate), 'MMM d')}
              </div>
              {task.pomodoroSessions > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-primary font-black">
                  <Clock className="h-3 w-3" />
                  {task.pomodoroSessions}
                </div>
              )}
            </div>
            
            <div className="flex -space-x-2">
              {task.assignees.map((a, i) => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[10px] font-bold">
                  {a.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDetailPanel task={task} open={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </>
  );
}
