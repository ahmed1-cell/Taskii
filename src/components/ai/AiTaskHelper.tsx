
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Plus, ArrowRight, Download } from "lucide-react";
import { aiPoweredTaskBreakdown, AiPoweredTaskBreakdownOutput } from "@/ai/flows/ai-powered-task-breakdown";
import { useTaskiiStore } from "@/app/lib/store";
import { Badge } from "@/components/ui/badge";
import { jsPDF } from "jspdf";

export function AiTaskHelper() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPoweredTaskBreakdownOutput | null>(null);
  const { addTask } = useTaskiiStore();

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const output = await aiPoweredTaskBreakdown({ projectDescription: goal });
      setResult(output);
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportResultToPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Project Roadmap", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Goal: ${goal}`, 20, 35);
    
    doc.setFontSize(14);
    doc.text("Strategy:", 20, 50);
    doc.setFontSize(10);
    const splitAction = doc.splitTextToSize(result.actionPlan, 170);
    doc.text(splitAction, 20, 60);

    doc.setFontSize(14);
    doc.text("Key Sub-tasks:", 20, 110);
    doc.setFontSize(10);
    result.subTasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task}`, 20, 120 + (index * 10));
    });

    doc.save("ai-roadmap.pdf");
  };

  const createMainTask = () => {
    if (!result) return;
    
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: goal,
      description: result.actionPlan,
      status: 'todo' as const,
      priority: 'medium' as const,
      dueDate: new Date().toISOString(),
      recurrence: 'none' as const,
      workspaceId: 'w1',
      subTasks: result.subTasks.map((st, i) => ({
        id: `st-${i}`,
        title: st,
        completed: false
      }))
    };
    
    addTask(newTask);
    alert("Task and sub-tasks added to your list!");
    setResult(null);
    setGoal("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Task Breakdown
          </CardTitle>
          <CardDescription>
            Tell Taskii what you want to achieve, and we&apos;ll help you map out the steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., Plan a 3-day marketing campaign for a new app launch..."
              className="min-h-[120px] bg-white border-primary/20 focus:ring-primary"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <Button 
              className="w-full gap-2 rounded-full" 
              onClick={handleGenerate}
              disabled={loading || !goal.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing Goal...
                </>
              ) : (
                <>
                  Generate Roadmap <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Suggested Strategy</CardTitle>
              <Button onClick={exportResultToPDF} variant="outline" size="sm" className="gap-2">
                <Download className="h-3 w-3" /> PDF
              </Button>
            </div>
            <CardDescription className="bg-muted p-4 rounded-lg text-foreground italic border-l-4 border-primary mt-2">
              &quot;{result.actionPlan}&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sub-tasks suggested:</h4>
              <div className="grid gap-2">
                {result.subTasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50 border text-sm">
                    <Badge variant="outline" className="mt-0.5 shrink-0">{idx + 1}</Badge>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6">
            <Button onClick={createMainTask} className="w-full gap-2 bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4" /> Add to Worklist
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
