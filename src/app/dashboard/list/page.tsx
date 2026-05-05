
"use client";

import { useState } from "react";
import { useTaskiiStore } from "@/app/lib/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Priority, Status } from "@/app/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ListPage() {
  const { tasks, updateTask } = useTaskiiStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 border-blue-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    high: "bg-red-100 text-red-700 border-red-200",
  };

  const statusColors = {
    todo: "bg-slate-100 text-slate-700",
    "in-progress": "bg-primary/10 text-primary",
    done: "bg-green-100 text-green-700",
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Taskii Worklist Summary", 14, 15);
    
    const tableData = filteredTasks.map(t => [
      t.title,
      t.status,
      t.priority,
      format(new Date(t.dueDate), 'MMM d, yyyy')
    ]);

    (doc as any).autoTable({
      head: [['Title', 'Status', 'Priority', 'Due Date']],
      body: tableData,
      startY: 25,
    });

    doc.save("taskii-list.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Button onClick={exportToPDF} variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export PDF
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize font-normal", statusColors[task.status])}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize text-[10px] font-bold", priorityColors[task.priority])}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(task.dueDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' })}
                    >
                      {task.status === 'done' ? 'Reopen' : 'Complete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
