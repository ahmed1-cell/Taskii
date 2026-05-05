
"use client";

import { Task } from "@/app/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Trash2, Edit3, MoreVertical, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTaskiiStore } from "@/app/lib/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskiiStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 border-blue-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const completedSubtasks = task.subTasks.filter(st => st.completed).length;

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' });
  };

  return (
    <>
      <Card 
        onClick={() => setIsDetailOpen(true)}
        className="hover:shadow-lg transition-all cursor-pointer group border-l-4 border-l-transparent data-[priority=high]:border-l-red-400"
        data-priority={task.priority}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge className={cn("text-[10px] uppercase font-bold px-2 py-0", priorityColors[task.priority])} variant="outline">
              {task.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-md">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDetailOpen(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" /> Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive gap-2">
                  <Trash2 className="h-4 w-4" /> Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox 
              checked={task.status === 'done'} 
              onCheckedChange={() => updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' })}
              onClick={(e) => e.stopPropagation()}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={cn(
                "font-medium leading-tight mb-1 text-sm group-hover:text-primary transition-colors",
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
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-700 ease-in-out" 
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
                <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                  <Clock className="h-3 w-3" />
                  {task.pomodoroSessions}
                </div>
              )}
            </div>
            <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDetailModal task={task} open={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </>
  );
}

function TaskDetailModal({ task, open, onOpenChange }: { task: Task; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { updateTask, deleteTask } = useTaskiiStore();
  const [editedTask, setEditedTask] = useState(task);

  const saveChanges = () => {
    updateTask(task.id, editedTask);
    onOpenChange(false);
  };

  const toggleSubtask = (id: string) => {
    const newSubTasks = editedTask.subTasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    );
    setEditedTask({ ...editedTask, subTasks: newSubTasks });
    updateTask(task.id, { subTasks: newSubTasks });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Title</label>
            <Input 
              value={editedTask.title} 
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={editedTask.priority} onValueChange={(v: any) => setEditedTask({ ...editedTask, priority: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={editedTask.status} onValueChange={(v: any) => setEditedTask({ ...editedTask, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {editedTask.subTasks.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Subtasks</label>
              <div className="space-y-2 border rounded-lg p-3 bg-muted/30">
                {editedTask.subTasks.map(st => (
                  <div key={st.id} className="flex items-center gap-2">
                    <Checkbox 
                      checked={st.completed} 
                      onCheckedChange={() => toggleSubtask(st.id)}
                    />
                    <span className={cn("text-sm", st.completed && "line-through text-muted-foreground")}>
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={saveChanges}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
