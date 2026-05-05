
"use client";

import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { TaskCard } from "@/components/tasks/TaskCard";
import { useTaskiiStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ArrowRight, Sparkles, Timer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";

export default function DashboardPage() {
  const { tasks, currentUser, searchQuery } = useTaskiiStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentTasks = filteredTasks.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {currentUser?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening in your workspace today.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full shadow-lg gap-2 h-12 px-6">
          <Plus className="h-5 w-5" /> Quick Task
        </Button>
      </div>

      <AnalyticsOverview />

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Priority Focus</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-full px-4">
                <Filter className="h-3 w-3" /> Status
              </Button>
            </div>
          </div>
          <Link href="/dashboard/list">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 gap-1 rounded-full">
              Full Worklist <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-muted/20 border border-dashed rounded-xl">
              <p className="text-muted-foreground">No tasks found matching your criteria.</p>
            </div>
          )}
          
          {recentTasks.length < 4 && (
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              className="h-full min-h-[160px] border-dashed flex flex-col gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl group"
            >
              <div className="h-10 w-10 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Plus className="h-6 w-6 group-hover:text-primary" />
              </div>
              <span>Create Task</span>
            </Button>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 p-8 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Sparkles className="h-48 w-48 text-accent" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-accent-foreground flex items-center gap-2">
              🚀 Smart Breakdown
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Use Gemini AI to instantly decompose large projects into actionable sub-tasks and strategic roadmaps.
            </p>
            <Link href="/dashboard/tools/ai">
              <Button variant="default" className="bg-accent hover:bg-accent/90 rounded-full px-8 shadow-md">
                Try AI Helper
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Timer className="h-48 w-48 text-primary" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-primary flex items-center gap-2">
              ⏱️ Deep Work
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Activate the Pomodoro timer to eliminate distractions and log focus sessions directly to your priority tasks.
            </p>
            <Link href="/dashboard/tools/pomodoro">
              <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full px-8 shadow-md">
                Start Session
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CreateTaskModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
