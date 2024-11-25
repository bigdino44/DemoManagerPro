import { create } from 'zustand';
import { format } from 'date-fns';
import { useCustomerStore } from './customerStore';

export type DemoLocationType = 'Virtual' | 'Nexus' | 'On-site' | 'On-location';

export interface Demo {
  id: string;
  time: string;
  company: string;
  type: string;
  location: DemoLocationType;
  locationDetails?: string;
  attendees: number;
  date: Date;
  customerId: string;
  revenue?: number;
}

interface DemoStore {
  demos: Demo[];
  selectedDate: Date;
  selectedDemoId: string | null;
  addDemo: (demo: Omit<Demo, 'id'>) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedDemoId: (id: string | null) => void;
  getDemosForDate: (date: Date) => Demo[];
  updateDemoRevenue: (id: string, revenue: number) => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  demos: [
    {
      id: '1',
      time: "10:00 AM",
      company: "TechCorp Industries",
      type: "Product Demo",
      location: "Virtual",
      attendees: 4,
      date: new Date(),
      customerId: '1',
      revenue: 1200
    },
    {
      id: '2',
      time: "2:00 PM",
      company: "Global Solutions Ltd",
      type: "Technical Deep Dive",
      location: "Nexus",
      locationDetails: "Atlanta Innovation Hub",
      attendees: 6,
      date: new Date(),
      customerId: '2',
      revenue: 5500
    }
  ],
  selectedDate: new Date(),
  selectedDemoId: null,
  
  addDemo: (demo) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      demos: [...state.demos, { ...demo, id }]
    }));

    // Calculate and add revenue to customer
    const baseRevenue = {
      Virtual: 1000,
      Nexus: 5000,
      'On-site': 2500,
      'On-location': 7500
    }[demo.location] || 0;

    const extraAttendees = Math.max(0, demo.attendees - 5);
    const attendeeFees = extraAttendees * 100;
    const revenue = baseRevenue + attendeeFees;

    useCustomerStore.getState().addDemoRevenue(
      demo.customerId,
      id,
      revenue,
      demo.location
    );
  },
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setSelectedDemoId: (id) => {
    set({ selectedDemoId: id });
    
    if (!id) {
      useCustomerStore.getState().setSelectedCustomer(null);
      return;
    }
    
    const demo = get().demos.find(d => d.id === id);
    if (demo) {
      const customer = useCustomerStore.getState().customers.find(c => c.id === demo.customerId);
      useCustomerStore.getState().setSelectedCustomer(customer || null);
    }
  },
  
  getDemosForDate: (date) => {
    const { demos } = get();
    return demos.filter(demo => 
      format(demo.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  },

  updateDemoRevenue: (id, revenue) => set((state) => ({
    demos: state.demos.map(demo =>
      demo.id === id ? { ...demo, revenue } : demo
    )
  }))
}));