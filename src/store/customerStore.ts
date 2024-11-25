import { create } from 'zustand';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  influence: 'Decision Maker' | 'Technical Evaluator' | 'End User' | 'Financial Approver';
  email: string;
  phone?: string;
  notes?: string;
}

export interface CustomerProfile {
  id: string;
  company: string;
  industry: string;
  size: string;
  budget: string;
  website: string;
  status: 'Active' | 'Prospect' | 'Closed Won' | 'Closed Lost';
  painPoints: string[];
  requirements: string[];
  stakeholders: Stakeholder[];
  currentSolution?: string;
  timeline: string;
  notes: string;
  lastContact: Date;
  expectedRevenue: number;
  actualRevenue: number;
  recurringRevenue: number;
}

interface CustomerStore {
  customers: CustomerProfile[];
  selectedCustomer: CustomerProfile | null;
  setSelectedCustomer: (customer: CustomerProfile | null) => void;
  addCustomer: (customer: Omit<CustomerProfile, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<CustomerProfile>) => void;
  updateRevenue: (id: string, expectedRevenue: number, actualRevenue: number, recurringRevenue: number) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [
    {
      id: '1',
      company: 'TechCorp Industries',
      industry: 'Manufacturing',
      size: '1000-5000',
      budget: '$100k-500k',
      website: 'techcorp.com',
      status: 'Active',
      painPoints: [
        'Legacy system integration issues',
        'Scalability challenges',
        'Data security concerns'
      ],
      requirements: [
        'Cloud deployment',
        'Real-time analytics',
        'Mobile access',
        'Enterprise-grade security'
      ],
      stakeholders: [
        {
          id: 's1',
          name: 'John Smith',
          role: 'CTO',
          influence: 'Decision Maker',
          email: 'john.smith@techcorp.com',
          phone: '(555) 123-4567',
          notes: 'Primary technical contact'
        }
      ],
      currentSolution: 'Legacy on-premise system',
      timeline: 'Q2 2024',
      notes: 'High-priority prospect with immediate needs',
      lastContact: new Date('2024-03-15'),
      expectedRevenue: 250000,
      actualRevenue: 150000,
      recurringRevenue: 100000
    },
    {
      id: '2',
      company: 'Global Solutions Ltd',
      industry: 'Technology',
      size: '500-1000',
      budget: '$50k-100k',
      website: 'globalsolutions.io',
      status: 'Prospect',
      painPoints: [
        'High operational costs',
        'Manual process inefficiencies',
        'Limited visibility into metrics'
      ],
      requirements: [
        'Cost optimization tools',
        'Process automation',
        'Advanced reporting'
      ],
      stakeholders: [
        {
          id: 's3',
          name: 'Michael Chang',
          role: 'COO',
          influence: 'Decision Maker',
          email: 'm.chang@globalsolutions.io',
          phone: '(555) 987-6543'
        }
      ],
      currentSolution: 'Multiple disconnected tools',
      timeline: 'Q3 2024',
      notes: 'Looking for comprehensive solution',
      lastContact: new Date('2024-03-10'),
      expectedRevenue: 75000,
      actualRevenue: 0,
      recurringRevenue: 0
    }
  ],
  selectedCustomer: null,
  
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  
  addCustomer: (customer) => set((state) => ({
    customers: [...state.customers, { 
      ...customer, 
      id: Math.random().toString(36).substr(2, 9),
      expectedRevenue: 0,
      actualRevenue: 0,
      recurringRevenue: 0
    }]
  })),
  
  updateCustomer: (id, updates) => set((state) => ({
    customers: state.customers.map(customer =>
      customer.id === id ? { ...customer, ...updates } : customer
    )
  })),

  updateRevenue: (id, expectedRevenue, actualRevenue, recurringRevenue) => set((state) => ({
    customers: state.customers.map(customer =>
      customer.id === id ? {
        ...customer,
        expectedRevenue,
        actualRevenue,
        recurringRevenue
      } : customer
    )
  }))
}));