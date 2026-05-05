"use client";

import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { TaskCard } from "@/components/tasks/TaskCard";
import { useTaskiiStore } from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { tasks, currentUser } = useTaskiiStore();
  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {currentUser?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening in your workspace today.
        </p>
      </div>

      <AnalyticsOverview />

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Today&apos;s Priority</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-full">
                <Filter className="h-3 w-3" /> Filter
              </Button>
            </div>
          </div>
          <Link href="/dashboard/list">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <Button 
            variant="outline" 
            className="h-full min-h-[160px] border-dashed flex flex-col gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl"
          >
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <span>Add New Task</span>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-accent/5 rounded-xl border border-accent/10 p-6">
          <h3 className="text-lg font-semibold mb-2 text-accent-foreground flex items-center gap-2">
            🚀 Quick Goal Breakdown
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use our AI helper to instantly turn big projects into manageable daily tasks.
          </p>
          <Link href="/dashboard/tools/ai">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-full">
              Open AI Helper
            </Button>
          </Link>
        </div>
        
        <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
          <h3 className="text-lg font-semibold mb-2 text-primary flex items-center gap-2">
            ⏱️ Focus Session
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ready to dive deep? Start a Pomodoro timer and track your productivity in real-time.
          </p>
          <Link href="/dashboard/tools/pomodoro">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full">
              Start Timer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}