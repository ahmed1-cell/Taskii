import { PomodoroTimer } from "@/components/tools/PomodoroTimer";

export default function PomodoroPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Pomodoro Timer</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
        </p>
      </div>
      <PomodoroTimer />
    </div>
  );
}