"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Coffee, Zap, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { useTaskiiStore } from "@/app/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PomodoroTimerProps {
  isFloating?: boolean;
}

export function PomodoroTimer({ isFloating = false }: PomodoroTimerProps) {
  const { tasks, updateTask, isDeepWorkMode } = useTaskiiStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(isFloating);
  
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
          pomodoroSessions: (task.pomodoroSessions || 0) + 1,
          timeTracked: (task.timeTracked || 0) + 25
        });
      }
    }
    // Sound notification
    try {
      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
      audio.play();
    } catch (e) {}
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

  if (isMinimized && isFloating) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className={cn(
          "h-16 w-48 bg-card border-2 border-primary/20 rounded-2xl shadow-2xl flex items-center px-4 gap-3 cursor-pointer hover:border-primary transition-all",
          isDeepWorkMode && "bg-black/50 backdrop-blur-md"
        )}
      >
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {mode === 'work' ? <Zap className="h-5 w-5 text-primary" /> : <Coffee className="h-5 w-5 text-accent" />}
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{mode}</p>
          <p className="text-xl font-black tracking-tighter tabular-nums">{formatTime(timeLeft)}</p>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 rounded-full"
          onClick={(e) => { e.stopPropagation(); toggleTimer(); }}
        >
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  return (
    <Card className={cn(
      "max-w-md mx-auto overflow-hidden shadow-2xl border-2 border-primary/10 transition-all",
      isDeepWorkMode && "bg-black/80 backdrop-blur-xl text-white",
      isFloating && "w-80"
    )}>
      <CardHeader className="text-center pb-2 relative">
        {isFloating && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        )}
        <CardTitle className="flex items-center justify-center gap-2 text-xl font-black">
          {mode === 'work' ? <Zap className="h-6 w-6 text-primary" /> : <Coffee className="h-6 w-6 text-accent" />}
          {mode === 'work' ? 'FOCUS' : 'BREAK'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-2">
          {['work', 'short-break', 'long-break'].map((m: any) => (
            <Button 
              key={m}
              variant={mode === m ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => changeMode(m)}
              className="rounded-full text-[10px] font-black uppercase tracking-widest px-4"
            >
              {m.replace('-', ' ')}
            </Button>
          ))}
        </div>

        <div className="relative h-56 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="112" cy="112" r="90" className="stroke-secondary fill-transparent" strokeWidth="6" />
            <circle
              cx="112"
              cy="112"
              r="90"
              className={cn(
                "fill-transparent transition-all duration-1000",
                mode === 'work' ? "stroke-primary" : "stroke-accent"
              )}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-6xl font-black tracking-tighter tabular-nums leading-none">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {!isFloating && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Focusing on:</label>
              <Select onValueChange={setSelectedTaskId} value={selectedTaskId || ""}>
                <SelectTrigger className="rounded-xl bg-muted/50 border-none">
                  <SelectValue placeholder="Select task..." />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-2">
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" onClick={resetTimer}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-16 w-16 rounded-full shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90" onClick={toggleTimer}>
              {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
            <div className="w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
