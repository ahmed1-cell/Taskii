export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in_progress' | 'in_review' | 'done' | 'archived';
export type RecurrencePattern = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

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
  recurrence: {
    enabled: boolean;
    pattern: RecurrencePattern;
  };
  workspaceId: string;
  subTasks: SubTask[];
  pomodoroSessions: number;
  timeTracked: number; // in minutes
  assignees: string[]; // member IDs
  labels: { name: string; color: string }[];
  position: number;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  members: { userId: string; role: 'owner' | 'admin' | 'member' | 'viewer' }[];
  isPersonal: boolean;
  color?: string;
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    pomodoroWork: number;
    pomodoroBreak: number;
  };
}
