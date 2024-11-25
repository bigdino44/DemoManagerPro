import { create } from 'zustand';

export interface ChecklistItem {
  id: string;
  task: string;
  status: 'completed' | 'pending' | 'in-progress';
  category: string;
  priority: 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: Date;
  notes?: string;
}

interface PreparationStore {
  checklist: ChecklistItem[];
  toggleStatus: (id: string) => void;
  addItem: (item: Omit<ChecklistItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<ChecklistItem>) => void;
  deleteItem: (id: string) => void;
}

export const usePreparationStore = create<PreparationStore>((set) => ({
  checklist: [
    {
      id: '1',
      task: 'Environment configuration',
      status: 'completed',
      category: 'Technical Setup',
      priority: 'high',
      assignee: 'David Chen',
      notes: 'All systems verified and ready'
    },
    {
      id: '2',
      task: 'Network connectivity check',
      status: 'in-progress',
      category: 'Technical Setup',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: new Date('2024-03-20')
    },
    {
      id: '3',
      task: 'Demo account setup',
      status: 'completed',
      category: 'Technical Setup',
      priority: 'medium',
      assignee: 'Mike Wilson'
    },
    {
      id: '4',
      task: 'Custom demo script',
      status: 'completed',
      category: 'Content Preparation',
      priority: 'high',
      assignee: 'Emily Brown'
    },
    {
      id: '5',
      task: 'ROI calculator setup',
      status: 'completed',
      category: 'Content Preparation',
      priority: 'medium',
      assignee: 'John Smith'
    },
    {
      id: '6',
      task: 'Competitor comparison',
      status: 'pending',
      category: 'Content Preparation',
      priority: 'medium',
      dueDate: new Date('2024-03-22')
    },
    {
      id: '7',
      task: 'Risk assessment',
      status: 'completed',
      category: 'Safety Protocols',
      priority: 'high',
      assignee: 'Lisa Anderson'
    },
    {
      id: '8',
      task: 'Backup system check',
      status: 'pending',
      category: 'Safety Protocols',
      priority: 'high',
      dueDate: new Date('2024-03-21')
    }
  ],
  toggleStatus: (id) => set((state) => ({
    checklist: state.checklist.map(item => {
      if (item.id !== id) return item;
      const statusOrder = ['pending', 'in-progress', 'completed'];
      const currentIndex = statusOrder.indexOf(item.status);
      const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length] as ChecklistItem['status'];
      return { ...item, status: nextStatus };
    })
  })),
  addItem: (item) => set((state) => ({
    checklist: [...state.checklist, { ...item, id: Math.random().toString(36).substr(2, 9) }]
  })),
  updateItem: (id, updates) => set((state) => ({
    checklist: state.checklist.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  deleteItem: (id) => set((state) => ({
    checklist: state.checklist.filter(item => item.id !== id)
  }))
}));