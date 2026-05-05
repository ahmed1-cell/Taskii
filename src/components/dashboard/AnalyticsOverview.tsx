
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskiiStore } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', completed: 4, planned: 5 },
  { name: 'Tue', completed: 6, planned: 7 },
  { name: 'Wed', completed: 3, planned: 6 },
  { name: 'Thu', completed: 8, planned: 8 },
  { name: 'Fri', completed: 10, planned: 12 },
  { name: 'Sat', completed: 5, planned: 5 },
  { name: 'Sun', completed: 2, planned: 3 },
];

export function AnalyticsOverview() {
  const { tasks } = useTaskiiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-full lg:col-span-2 h-[350px] bg-muted animate-pulse rounded-xl" />
      <div className="h-[350px] bg-muted animate-pulse rounded-xl" />
    </div>
  );
  
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;

  const statusData = [
    { name: 'Done', value: completedCount, color: 'hsl(var(--primary))' },
    { name: 'In Progress', value: inProgressCount, color: 'hsl(var(--accent))' },
    { name: 'To Do', value: todoCount, color: '#94a3b8' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Weekly Productivity</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="planned" 
                stroke="#cbd5e1" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Current Status</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold">{Math.round((completedCount / (tasks.length || 1)) * 100) || 0}%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${(completedCount / (tasks.length || 1)) * 100 || 0}%` }} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
