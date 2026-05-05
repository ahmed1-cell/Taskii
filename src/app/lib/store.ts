import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Workspace, User, Status, Priority } from './types';

interface TaskiiState {
  tasks: Task[];
  workspaces: Workspace[];
  currentUser: User | null;
  activeWorkspaceId: string | null;
  searchQuery: string;
  members: User[];
  isDeepWorkMode: boolean;
  
  // Actions
  setDeepWorkMode: (active: boolean) => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Partial<Task>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
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
          title: 'Architect Taskii v2.0 Core',
          description: 'Define MERN stack architecture and Taskii Violet branding.',
          status: 'in_progress',
          priority: 'urgent',
          dueDate: new Date().toISOString(),
          recurrence: { enabled: false, pattern: 'none' },
          workspaceId: 'w1',
          subTasks: [
            { id: 'st1', title: 'Define Schemas', completed: true },
            { id: 'st2', title: 'Implement Deep Work Mode', completed: false }
          ],
          pomodoroSessions: 4,
          timeTracked: 120,
          assignees: ['u1'],
          labels: [{ name: 'Core', color: '#6C5CE7' }],
          position: 1
        }
      ],
      workspaces: [
        { 
          id: 'w1', 
          name: 'Main HQ', 
          slug: 'main-hq',
          ownerId: 'u1', 
          members: [{ userId: 'u1', role: 'owner' }], 
          isPersonal: true,
          color: '#6C5CE7'
        }
      ],
      currentUser: { 
        id: 'u1', 
        name: 'Muhammad Ahmed', 
        email: 'ahmed@taskii.app',
        preferences: { theme: 'light', pomodoroWork: 25, pomodoroBreak: 5 }
      },
      members: [
        { id: 'u1', name: 'Muhammad Ahmed', email: 'ahmed@taskii.app' }
      ],
      activeWorkspaceId: 'w1',
      searchQuery: '',
      isDeepWorkMode: false,

      setDeepWorkMode: (isDeepWorkMode) => set({ isDeepWorkMode }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      addTask: (task) => set((state) => ({ 
        tasks: [{
          id: Math.random().toString(36).substr(2, 9),
          title: 'New Task',
          description: '',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date().toISOString(),
          recurrence: { enabled: false, pattern: 'none' },
          workspaceId: state.activeWorkspaceId || 'w1',
          subTasks: [],
          pomodoroSessions: 0,
          timeTracked: 0,
          assignees: [],
          labels: [],
          position: state.tasks.length + 1,
          ...task
        } as Task, ...state.tasks] 
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),

      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
      
      addMember: (member) => set((state) => ({ 
        members: [...state.members, member] 
      })),

      removeMember: (id) => set((state) => ({ 
        members: state.members.filter(m => m.id !== id) 
      })),

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
