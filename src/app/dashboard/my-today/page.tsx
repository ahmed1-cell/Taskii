
"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Zap, Plus, ArrowRight, Target, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MyTodayPage() {
  const { tasks, searchQuery } = useTaskiiStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8">Syncing Focus...</div>;

  // Filter tasks for "Today" (Pending tasks with high priority or due today)
  const todayTasks = tasks.filter(t => 
    t.status !== 'done' && 
    (t.priority === 'urgent' || t.priority === 'high')
  ).slice(0, 5); // Focus Queue limit: 5 tasks

  const filteredTasks = todayTasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary fill-primary/20" /> My Today
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-black px-4 py-1 rounded-full">
              FOCUS MODE
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Your high-impact queue. Focus on these {filteredTasks.length} tasks to crush your goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold">
            <Flame className="h-4 w-4" /> 12 Day Streak
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-muted/20 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Clear Skies Ahead</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">No urgent tasks in your focus queue. Drag tasks from your workspace to "My Today" to stay productive.</p>
            </div>
          </div>
        )}
        
        {filteredTasks.length > 0 && filteredTasks.length < 5 && (
           <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline" 
            className="h-full min-h-[180px] border-dashed border-2 flex flex-col gap-3 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-[2rem] group"
          >
            <div className="h-12 w-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Plus className="h-6 w-6 group-hover:text-primary" />
            </div>
            <span className="font-bold">Queue Next Task</span>
          </Button>
        )}
      </div>

      <div className="bg-gradient-to-r from-primary to-accent p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <Zap className="h-64 w-64" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl font-black mb-4">Master your focus.</h2>
          <p className="text-lg opacity-90 mb-8 font-medium">
            Taskii's Focus Queue is designed to prevent decision fatigue. By limiting your today's list to 5 high-impact items, you ensure meaningful progress every single day.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">1</div>
            <div className="h-12 w-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">2</div>
            <div className="h-12 w-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">3</div>
            <div className="h-12 w-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">4</div>
            <div className="h-12 w-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">5</div>
          </div>
        </div>
      </div>

      <CreateTaskModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
