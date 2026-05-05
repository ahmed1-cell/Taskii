
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTaskiiStore } from "@/app/lib/store";
import { Task } from "@/app/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Check, ArrowRight, Target } from "lucide-react";
import { aiPoweredTaskBreakdown, AiPoweredTaskBreakdownOutput } from "@/ai/flows/ai-powered-task-breakdown";
import { cn } from "@/lib/utils";

interface AiBattlePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiBattlePlanModal({ open, onOpenChange }: AiBattlePlanModalProps) {
  const { tasks, updateTask } = useTaskiiStore();
  const [step, setStep] = useState<'select' | 'generating' | 'result'>('select');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [result, setResult] = useState<AiPoweredTaskBreakdownOutput | null>(null);

  const pendingTasks = tasks.filter(t => t.status !== 'done');

  const handleTaskSelect = async (task: Task) => {
    setSelectedTask(task);
    setStep('generating');
    try {
      const output = await aiPoweredTaskBreakdown({ 
        projectDescription: `Task: ${task.title}. Context: ${task.description}` 
      });
      setResult(output);
      setStep('result');
    } catch (error) {
      console.error("AI Generation failed:", error);
      setStep('select');
    }
  };

  const applyPlan = () => {
    if (!selectedTask || !result) return;
    
    const newSubTasks = result.subTasks.map((st, i) => ({
      id: `ai-${Date.now()}-${i}`,
      title: st,
      completed: false
    }));

    updateTask(selectedTask.id, {
      subTasks: [...selectedTask.subTasks, ...newSubTasks],
      description: `${selectedTask.description}\n\nAI Suggested Plan: ${result.actionPlan}`
    });

    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setStep('select');
    setSelectedTask(null);
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if(!val) reset(); }}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            AI Battle Plan
          </DialogTitle>
          <DialogDescription>
            {step === 'select' && "Select a pending task to generate an automated sprint strategy."}
            {step === 'generating' && "Analyzing task complexity and generating roadmap..."}
            {step === 'result' && `Battle plan ready for: ${selectedTask?.title}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden p-6 pt-4">
          {step === 'select' && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {pendingTasks.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    No pending tasks found. Add a task to generate a plan!
                  </div>
                ) : (
                  pendingTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleTaskSelect(task)}
                      className="w-full text-left p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold truncate text-sm">{task.title}</h4>
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{task.description || "No description provided."}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-4" />
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          )}

          {step === 'generating' && (
            <div className="h-[400px] flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium animate-pulse">Calculating optimal strategy...</p>
            </div>
          )}

          {step === 'result' && result && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-xl border-l-4 border-primary">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">The Strategy</h5>
                  <p className="text-sm italic text-foreground leading-relaxed">
                    "{result.actionPlan}"
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Actionable Sub-tasks</h5>
                  <div className="grid gap-2">
                    {result.subTasks.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-transparent">
                        <div className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-sm">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter className="p-6 border-t bg-muted/30">
          {step === 'result' ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={reset} className="flex-1 rounded-full">
                Try Another
              </Button>
              <Button onClick={applyPlan} className="flex-1 rounded-full gap-2">
                <Check className="h-4 w-4" /> Apply to Task
              </Button>
            </div>
          ) : (
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
