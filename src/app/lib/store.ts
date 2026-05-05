import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Workspace, User } from './types';

interface TaskiiState {
  tasks: Task[];
  workspaces: Workspace[];
  currentUser: User | null;
  activeWorkspaceId: string | null;
  searchQuery: string;
  members: User[];
  isDeepWorkMode: boolean;
  setDeepWorkMode: (active: boolean) => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (id: string) => void;
  addMember: (member: User) => void;
  removeMember: (id: string) => void;
  clearAllData: () => void;
}

export const useTaskiiStore = create<TaskiiState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: '1',
          title: 'Design Taskii v2.0 Branding',
          description: 'Apply #6C5CE7 Taskii Violet and refine the architectural blueprint.',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date().toISOString(),
          recurrence: 'none',
          workspaceId: 'w1',
          subTasks: [
            { id: 'st1', title: 'Update globals.css colors', completed: true },
            { id: 'st2', title: 'Implement Deep Work Mode', completed: false }
          ],
          pomodoroSessions: 2
        },
        {
          id: '2',
          title: 'Architectural Review',
          description: 'Review task engine performance and Redis caching strategy.',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          recurrence: 'weekly',
          workspaceId: 'w1',
          subTasks: []
        }
      ],
      workspaces: [
        { id: 'w1', name: 'Main HQ', ownerId: 'u1', members: ['u1'], isPersonal: true },
        { id: 'w2', name: 'Dev Team', ownerId: 'u1', members: ['u1', 'u2'], isPersonal: false }
      ],
      currentUser: { id: 'u1', name: 'Muhammad Ahmed', email: 'ahmed@taskii.app' },
      members: [
        { id: 'u1', name: 'Muhammad Ahmed', email: 'ahmed@taskii.app' },
        { id: 'u2', name: 'Sarah Miller', email: 'sarah@example.com' }
      ],
      activeWorkspaceId: 'w1',
      searchQuery: '',
      isDeepWorkMode: false,
      setDeepWorkMode: (isDeepWorkMode) => set({ isDeepWorkMode }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
      setWorkspaces: (workspaces) => set({ workspaces }),
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
      addMember: (member) => set((state) => ({ members: [...state.members, member] })),
      removeMember: (id) => set((state) => ({ members: state.members.filter(m => m.id !== id) })),
      clearAllData: () => {
        localStorage.removeItem('taskii-storage');
        window.location.reload();
      }
    }),
    {
      name: 'taskii-storage',
    }
  )
);