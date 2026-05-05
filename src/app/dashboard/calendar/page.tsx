
"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { TaskCard } from "@/components/tasks/TaskCard";

export default function CalendarPage() {
  const { tasks } = useTaskiiStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedTasks = tasks.filter(t => 
    date && isSameDay(new Date(t.dueDate), date)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none"
          />
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTasks.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <p>No tasks scheduled for this day.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
