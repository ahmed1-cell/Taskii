"use client";

import { Task, SubTask } from "@/app/lib/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  Trash2, 
  Plus, 
  Tag, 
  User, 
  MessageSquare,
  Activity,
  Zap,
  MoreVertical
} from "lucide-react";
import { useTaskiiStore } from "@/app/lib/store";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface TaskDetailPanelProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailPanel({ task, open, onOpenChange }: TaskDetailPanelProps) {
  const { updateTask } = useTaskiiStore();
  const [editedTask, setEditedTask] = useState(task);
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    if (open) setEditedTask(task);
  }, [task, open]);

  const handleUpdate = (updates: Partial<Task>) => {
    const updated = { ...editedTask, ...updates };
    setEditedTask(updated);
    updateTask(task.id, updates);
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    const sub: SubTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: newSubtask,
      completed: false
    };
    handleUpdate({ subTasks: [...editedTask.subTasks, sub] });
    setNewSubtask("");
  };

  const toggleSubtask = (id: string) => {
    const subs = editedTask.subTasks.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    );
    handleUpdate({ subTasks: subs });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
              Task Details
            </Badge>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Zap className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>
          <Input 
            value={editedTask.title}
            onChange={(e) => handleUpdate({ title: e.target.value })}
            className="text-2xl font-black border-none px-0 focus-visible:ring-0 h-auto py-2 shadow-none"
          />
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8">
              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <Activity className="h-4 w-4" /> Description
                </div>
                <Textarea 
                  value={editedTask.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  placeholder="Add detailed acceptance criteria or notes..."
                  className="min-h-[120px] bg-muted/20 border-muted rounded-xl focus:ring-primary"
                />
              </div>

              {/* Subtasks Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <CheckSquare className="h-4 w-4" /> Subtasks
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {editedTask.subTasks.filter(s => s.completed).length}/{editedTask.subTasks.length}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {editedTask.subTasks.map(sub => (
                    <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                      <Checkbox 
                        checked={sub.completed}
                        onCheckedChange={() => toggleSubtask(sub.id)}
                        className="h-5 w-5 rounded-md border-2"
                      />
                      <span className={cn("text-sm flex-1", sub.completed && "line-through text-muted-foreground")}>
                        {sub.title}
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="flex gap-2 mt-4">
                    <Input 
                      placeholder="Add a subtask..." 
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
                      className="rounded-xl bg-muted/20 border-dashed"
                    />
                    <Button size="icon" onClick={addSubtask} className="rounded-xl"><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>

              {/* Activity Section Placeholder */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <MessageSquare className="h-4 w-4" /> Comments
                </div>
                <div className="py-12 text-center bg-muted/20 rounded-2xl border-2 border-dashed">
                  <p className="text-xs text-muted-foreground">No comments yet. Start the conversation!</p>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Sidebar Metadata */}
          <div className="w-48 border-l bg-muted/5 p-4 space-y-8 hidden md:block">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Status</label>
                <Select value={editedTask.status} onValueChange={(v: any) => handleUpdate({ status: v })}>
                  <SelectTrigger className="h-8 text-xs font-bold rounded-lg border-none bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Priority</label>
                <Select value={editedTask.priority} onValueChange={(v: any) => handleUpdate({ priority: v })}>
                  <SelectTrigger className="h-8 text-xs font-bold rounded-lg border-none bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Due Date</label>
                <Input 
                  type="date"
                  value={format(new Date(editedTask.dueDate), 'yyyy-MM-dd')}
                  onChange={(e) => handleUpdate({ dueDate: new Date(e.target.value).toISOString() })}
                  className="h-8 text-xs font-bold border-none bg-muted/50 rounded-lg"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                <Clock className="h-3 w-3" /> Productivity
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Sessions</span>
                  <span className="font-bold text-primary">{editedTask.pomodoroSessions}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tracked</span>
                  <span className="font-bold">{editedTask.timeTracked}m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-muted/30 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">Close</Button>
          <Button className="rounded-xl px-8 shadow-lg shadow-primary/20" onClick={() => onOpenChange(false)}>Save Changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CheckSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}
