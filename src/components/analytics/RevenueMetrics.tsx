import React from 'react';
import { DollarSign, TrendingUp, RefreshCw, Calendar } from 'lucide-react';
import { useCustomerStore } from '../../store/customerStore';

export function RevenueMetrics() {
  const { customers } = useCustomerStore();

  const totalActualRevenue = customers.reduce((sum, customer) => 
    sum + customer.actualRevenue, 0
  );
  
  const totalRecurringRevenue = customers.reduce((sum, customer) => 
    sum + customer.recurringRevenue, 0
  );
  
  const totalExpectedRevenue = customers.reduce((sum, customer) => 
    sum + customer.expectedRevenue, 0
  );

  const metrics = [
    {
      title: 'Actual Revenue',
      value: `$${(totalActualRevenue / 1000).toFixed(1)}k`,
      change: '+15%',
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Recurring Revenue',
      value: `$${(totalRecurringRevenue / 1000).toFixed(1)}k`,
      change: '+12%',
      icon: <RefreshCw className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Expected Revenue',
      value: `$${(totalExpectedRevenue / 1000).toFixed(1)}k`,
      change: '+25%',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />
    },
    {
      title: 'Pipeline Coverage',
      value: `${((totalExpectedRevenue / totalActualRevenue) * 100 || 0).toFixed(0)}%`,
      change: '+18%',
      icon: <Calendar className="w-6 h-6 text-rose-600" />
    }
  ];

  return (
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
  );
}