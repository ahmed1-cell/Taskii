"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Coffee, Zap, ChevronDown } from "lucide-react";
import { useTaskiiStore } from "@/app/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PomodoroTimer() {
  const { tasks, updateTask } = useTaskiiStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = mode === 'work' ? 25 * 60 : mode === 'short-break' ? 5 * 60 : 15 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleSessionComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    if (mode === 'work' && selectedTaskId) {
      const task = tasks.find(t => t.id === selectedTaskId);
      if (task) {
        updateTask(selectedTaskId, { 
          pomodoroSessions: (task.pomodoroSessions || 0) + 1 
        });
      }
    }
    // Simple alert or notification logic here
    alert("Session complete!");
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const changeMode = (newMode: 'work' | 'short-break' | 'long-break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : newMode === 'short-break' ? 5 * 60 : 15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <CardHeader className="text-center pb-2">
        <CardTitle className="flex items-center justify-center gap-2">
          {mode === 'work' ? <Zap className="h-5 w-5 text-primary" /> : <Coffee className="h-5 w-5 text-accent" />}
          {mode === 'work' ? 'Focus Session' : 'Take a Break'}
        </CardTitle>
        <CardDescription>
          {mode === 'work' ? 'Stay concentrated on your task' : 'Relax and recharge your energy'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-2">
          <Button 
            variant={mode === 'work' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => changeMode('work')}
            className="rounded-full"
          >
            Work
          </Button>
          <Button 
            variant={mode === 'short-break' ? 'secondary' : 'outline'} 
            size="sm" 
            onClick={() => changeMode('short-break')}
            className="rounded-full"
          >
            Short Break
          </Button>
          <Button 
            variant={mode === 'long-break' ? 'secondary' : 'outline'} 
            size="sm" 
            onClick={() => changeMode('long-break')}
            className="rounded-full"
          >
            Long Break
          </Button>
        </div>

        <div className="relative h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="100"
              className="stroke-secondary fill-transparent"
              strokeWidth="8"
            />
            <circle
              cx="128"
              cy="128"
              r="100"
              className={cn(
                "fill-transparent transition-all duration-1000",
                mode === 'work' ? "stroke-primary" : "stroke-accent"
              )}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-6xl font-bold tracking-tighter tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Focusing on:</label>
            <Select onValueChange={setSelectedTaskId} value={selectedTaskId || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task to track..." />
              </SelectTrigger>
              <SelectContent>
                {tasks.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" onClick={resetTimer}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-16 w-16 rounded-full shadow-lg" onClick={toggleTimer}>
              {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-full invisible">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}