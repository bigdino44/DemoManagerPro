import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDemoStore } from '../../store/demoStore';
import { useCustomerStore } from '../../store/customerStore';
import { RevenueMetrics } from './RevenueMetrics';
import { Calendar, Users2, TrendingUp, DollarSign } from 'lucide-react';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export function AnalyticsView() {
  const demos = useDemoStore(state => state.demos);
  const customers = useCustomerStore(state => state.customers);

  // Calculate metrics
  const calculateMetrics = () => {
    const totalDemos = demos.length;
    const avgAttendees = Math.round(demos.reduce((acc, demo) => acc + demo.attendees, 0) / totalDemos || 0);
    
    // Calculate conversion rate based on customers with actual revenue
    const customersWithRevenue = customers.filter(c => c.actualRevenue > 0).length;
    const conversionRate = Math.round((customersWithRevenue / customers.length) * 100) || 0;

    // Calculate total revenue
    const totalRevenue = customers.reduce((sum, customer) => 
      sum + customer.actualRevenue, 0
    );

    return {
      totalDemos,
      avgAttendees,
      conversionRate,
      totalRevenue
    };
  };

  const { totalDemos, avgAttendees, conversionRate, totalRevenue } = calculateMetrics();

  // Calculate demo type distribution
  const demoTypeData = [
    { name: 'Virtual', value: demos.filter(d => d.location === 'Virtual').length },
    { name: 'Nexus', value: demos.filter(d => d.location === 'Nexus').length },
    { name: 'On-site', value: demos.filter(d => d.location === 'On-site').length },
    { name: 'On-location', value: demos.filter(d => d.location === 'On-location').length }
  ];

  // Monthly trends data
  const monthlyTrends = [
    { month: 'Jan', Virtual: 4, Nexus: 2, 'On-site': 3, 'On-location': 1 },
    { month: 'Feb', Virtual: 6, Nexus: 3, 'On-site': 4, 'On-location': 2 },
    { month: 'Mar', Virtual: 5, Nexus: 4, 'On-site': 4, 'On-location': 3 },
    { month: 'Apr', Virtual: 7, Nexus: 2, 'On-site': 3, 'On-location': 2 },
    { month: 'May', Virtual: 8, Nexus: 3, 'On-site': 4, 'On-location': 4 },
    { month: 'Jun', Virtual: 6, Nexus: 5, 'On-site': 3, 'On-location': 3 }
  ];

  const metrics = [
    {
      title: 'Total Demos',
      value: totalDemos,
      change: '+12%',
      icon: <Calendar className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Avg. Attendees',
      value: avgAttendees,
      change: '+8%',
      icon: <Users2 className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      change: '+5%',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />
    },
    {
      title: 'Revenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      change: '+15%',
      icon: <DollarSign className="w-6 h-6 text-rose-600" />
    }
  ];

  return (
    <div className="space-y-6">
      <RevenueMetrics />

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{metric.icon}</div>
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <p className="text-2xl font-bold mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Monthly Demo Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Virtual" stackId="a" fill="#4f46e5" />
                <Bar dataKey="Nexus" stackId="a" fill="#10b981" />
                <Bar dataKey="On-site" stackId="a" fill="#f59e0b" />
                <Bar dataKey="On-location" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Demo Type Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demoTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demoTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {demoTypeData.map((type, index) => (
              <div key={type.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-gray-600">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}