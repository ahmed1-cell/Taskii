export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  recurrence: Recurrence;
  workspaceId: string;
  subTasks: SubTask[];
  pomodoroSessions?: number;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
  isPersonal: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}