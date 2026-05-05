import { create } from 'zustand';
import { Task, Workspace, User } from './types';

interface TaskiiState {
  tasks: Task[];
  workspaces: Workspace[];
  currentUser: User | null;
  activeWorkspaceId: string | null;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (id: string) => void;
}

// In a real app, this would be Redux or TanStack Query + API. 
// Using a simple state manager for the scaffolded demo.
import { create as createZustand } from 'zustand';

export const useTaskiiStore = createZustand<TaskiiState>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Design Taskii Homepage',
      description: 'Focus on minimalist aesthetic and high usability.',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date().toISOString(),
      recurrence: 'none',
      workspaceId: 'w1',
      subTasks: [
        { id: 'st1', title: 'Define color palette', completed: true },
        { id: 'st2', title: 'Create wireframes', completed: false }
      ],
      pomodoroSessions: 2
    },
    {
      id: '2',
      title: 'Weekly Review',
      description: 'Review task progress and plan next week.',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString(),
      recurrence: 'weekly',
      workspaceId: 'w1',
      subTasks: []
    }
  ],
  workspaces: [
    { id: 'w1', name: 'Personal', ownerId: 'u1', members: ['u1'], isPersonal: true },
    { id: 'w2', name: 'Team Alpha', ownerId: 'u1', members: ['u1', 'u2'], isPersonal: false }
  ],
  currentUser: { id: 'u1', name: 'Muhammad Ahmed', email: 'ahmed@taskii.app' },
  activeWorkspaceId: 'w1',
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setActiveWorkspace: (id) => set({ activeWorkspaceId: id })
}));