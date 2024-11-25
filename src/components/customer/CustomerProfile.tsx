import React, { useState } from 'react';
import { Building2, Users2, DollarSign, Globe, Calendar, Phone, Mail, FileText, Plus, X, Search } from 'lucide-react';
import { useCustomerStore } from '../../store/customerStore';
import { format } from 'date-fns';
import { NewCustomerModal } from '../modals/NewCustomerModal';

export function CustomerProfile() {
  const { customers, selectedCustomer: profile, setSelectedCustomer, updateRevenue } = useCustomerStore();
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRevenueUpdate = (customerId: string) => {
    const expectedRevenue = parseFloat(prompt('Enter expected revenue:', '0') || '0');
    const actualRevenue = parseFloat(prompt('Enter actual revenue:', '0') || '0');
    const recurringRevenue = parseFloat(prompt('Enter recurring revenue:', '0') || '0');
    
    if (!isNaN(expectedRevenue) && !isNaN(actualRevenue) && !isNaN(recurringRevenue)) {
      updateRevenue(customerId, expectedRevenue, actualRevenue, recurringRevenue);
    }
  };

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Customers</h2>
          <button 
            onClick={() => setIsNewCustomerModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Customer
          </button>
        </div>

        <div className="mb-4 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{customer.company}</h3>
                  <p className="text-sm text-gray-500">{customer.industry} · {customer.size} employees</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                  customer.status === 'Prospect' ? 'bg-blue-100 text-blue-700' :
                  customer.status === 'Closed Won' ? 'bg-indigo-100 text-indigo-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {customer.status}
                </span>
              </div>
              <div className="mt-2 flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {customer.budget}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {customer.timeline}
                </div>
              </div>
            </div>
          ))}
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No customers found matching your search
            </div>
          )}
        </div>

        <NewCustomerModal 
          isOpen={isNewCustomerModalOpen}
          onClose={() => setIsNewCustomerModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.company}</h2>
            <p className="text-sm text-gray-500">{profile.industry} · {profile.size} employees</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedCustomer(null)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
          <span className={`px-3 py-1 rounded-full text-sm ${
            profile.status === 'Active' ? 'bg-green-100 text-green-700' :
            profile.status === 'Prospect' ? 'bg-blue-100 text-blue-700' :
            profile.status === 'Closed Won' ? 'bg-indigo-100 text-indigo-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {profile.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Budget: {profile.budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-indigo-600 hover:text-indigo-700">
            {profile.website}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Timeline: {profile.timeline}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Last Contact: {format(profile.lastContact, 'MMM d, yyyy')}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Revenue</h3>
          <button
            onClick={() => handleRevenueUpdate(profile.id)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Update Revenue
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Expected Revenue</p>
            <p className="text-lg font-medium">${profile.expectedRevenue.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Actual Revenue</p>
            <p className="text-lg font-medium">${profile.actualRevenue.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Recurring Revenue</p>
            <p className="text-lg font-medium">${profile.recurringRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Current Solution</h3>
        <p className="text-sm text-gray-600">{profile.currentSolution}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Pain Points</h3>
        <div className="grid grid-cols-2 gap-3">
          {profile.painPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2 text-sm bg-red-50 text-red-700 p-2 rounded">
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Requirements</h3>
        <div className="grid grid-cols-2 gap-3">
          {profile.requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm bg-green-50 text-green-700 p-2 rounded">
              {req}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Stakeholders</h3>
        <div className="space-y-3">
          {profile.stakeholders.map((person) => (
            <div key={person.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.role}</p>
                </div>
                <span className="text-sm text-indigo-600">{person.influence}</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${person.email}`} className="hover:text-indigo-600">
                    {person.email}
                  </a>
                </div>
                {person.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${person.phone}`} className="hover:text-indigo-600">
                      {person.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {profile.notes && (
        <div className="space-y-2">
          <h3 className="font-medium">Notes</h3>
          <p className="text-sm text-gray-600">{profile.notes}</p>
        </div>
      )}
    </div>
  );
}