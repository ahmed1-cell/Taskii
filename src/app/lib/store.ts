
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
          title: 'Design Taskii Homepage',
          description: 'Focus on minimalist aesthetic and high usability.',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-05-15T00:00:00.000Z',
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
          dueDate: '2024-05-20T00:00:00.000Z',
          recurrence: 'weekly',
          workspaceId: 'w1',
          subTasks: []
        }
      ],
      workspaces: [
        { id: 'w1', name: 'Personal', ownerId: 'u1', members: ['u1'], isPersonal: true },
        { id: 'w2', name: 'Team Alpha', ownerId: 'u1', members: ['u1', 'u2'], isPersonal: false }
      ],
      currentUser: { id: 'u1', name: 'Guest User', email: 'guest@taskii.app' },
      members: [
        { id: 'u1', name: 'Guest User', email: 'guest@taskii.app' },
        { id: 'u2', name: 'Sarah Miller', email: 'sarah@example.com' }
      ],
      activeWorkspaceId: 'w1',
      searchQuery: '',
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
