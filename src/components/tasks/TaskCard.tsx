"use client";

import { Task } from "@/app/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MoreHorizontal, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTaskiiStore } from "@/app/lib/store";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask } = useTaskiiStore();

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 border-blue-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const completedSubtasks = task.subTasks.filter(st => st.completed).length;

  return (
    <Card className="hover:shadow-md transition-all cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={cn("text-[10px] uppercase font-bold", priorityColors[task.priority])} variant="outline">
            {task.priority}
          </Badge>
          <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.status === 'done'} 
            onCheckedChange={(checked) => updateTask(task.id, { status: checked ? 'done' : 'todo' })}
            className="mt-1"
          />
          <div className="flex-1">
            <h3 className={cn(
              "font-medium leading-tight mb-1",
              task.status === 'done' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          </div>
        </div>

        {task.subTasks.length > 0 && (
          <div className="mb-3 pl-7">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
              <span>Subtasks</span>
              <span>{completedSubtasks}/{task.subTasks.length}</span>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full transition-all duration-500" 
                style={{ width: `${(completedSubtasks / task.subTasks.length) * 100}%` }} 
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.dueDate), 'MMM d')}
            </div>
            {task.pomodoroSessions && task.pomodoroSessions > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-primary font-medium">
                <Clock className="h-3 w-3" />
                {task.pomodoroSessions} sessions
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            2
          </div>
        </div>
      </CardContent>
    </Card>
  );
}