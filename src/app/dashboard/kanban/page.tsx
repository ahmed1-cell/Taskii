
"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Status } from "@/app/lib/types";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import Link from "next/link";

const columns: { title: string; status: Status }[] = [
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Done', status: 'done' },
];

export default function KanbanPage() {
  const { tasks, searchQuery } = useTaskiiStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8">Loading Board...</div>;

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/members">
            <Button size="sm" variant="outline" className="gap-2">
              <Users className="h-4 w-4" /> Members
            </Button>
          </Link>
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[600px]">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(t => t.status === column.status);
          
          return (
            <div key={column.status} className="flex-1 min-w-[320px] bg-secondary/30 rounded-xl p-4 flex flex-col gap-4 border border-transparent hover:border-border transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                    {columnTasks.length}
                  </Badge>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-250px)]">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="ghost" 
                  className="w-full border border-dashed border-muted-foreground/20 text-muted-foreground hover:text-primary hover:border-primary/50 text-xs py-2 h-auto flex gap-2"
                >
                  <Plus className="h-3 w-3" /> Add Task
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <CreateTaskModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
