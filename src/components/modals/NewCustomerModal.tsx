import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useCustomerStore, CustomerProfile, Stakeholder } from '../../store/customerStore';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCustomerModal({ isOpen, onClose }: NewCustomerModalProps) {
  const [formData, setFormData] = useState<Omit<CustomerProfile, 'id'>>({
    company: '',
    industry: '',
    size: '',
    budget: '',
    website: '',
    status: 'Prospect',
    painPoints: [''],
    requirements: [''],
    stakeholders: [],
    timeline: '',
    notes: '',
    lastContact: new Date()
  });

  const addCustomer = useCustomerStore(state => state.addCustomer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer(formData);
    onClose();
  };

  const addStakeholder = () => {
    setFormData(prev => ({
      ...prev,
      stakeholders: [...prev.stakeholders, {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        role: '',
        influence: 'End User',
        email: ''
      }]
    }));
  };

  const updateStakeholder = (index: number, updates: Partial<Stakeholder>) => {
    setFormData(prev => ({
      ...prev,
      stakeholders: prev.stakeholders.map((s, i) => 
        i === index ? { ...s, ...updates } : s
      )
    }));
  };

  const removeStakeholder = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stakeholders: prev.stakeholders.filter((_, i) => i !== index)
    }));
  };

  const addListItem = (field: 'painPoints' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateListItem = (field: 'painPoints' | 'requirements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (field: 'painPoints' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Add New Customer</h3>
                  <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={e => setFormData(d => ({ ...d, company: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Industry</label>
                      <input
                        type="text"
                        required
                        value={formData.industry}
                        onChange={e => setFormData(d => ({ ...d, industry: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Size</label>
                      <select
                        required
                        value={formData.size}
                        onChange={e => setFormData(d => ({ ...d, size: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select size</option>
                        <option value="1-100">1-100</option>
                        <option value="100-500">100-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000-5000">1000-5000</option>
                        <option value="5000+">5000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Budget Range</label>
                      <select
                        required
                        value={formData.budget}
                        onChange={e => setFormData(d => ({ ...d, budget: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select budget</option>
                        <option value="$10k-50k">$10k-50k</option>
                        <option value="$50k-100k">$50k-100k</option>
                        <option value="$100k-500k">$100k-500k</option>
                        <option value="$500k+">$500k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="text"
                        required
                        value={formData.website}
                        onChange={e => setFormData(d => ({ ...d, website: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Timeline</label>
                      <select
                        required
                        value={formData.timeline}
                        onChange={e => setFormData(d => ({ ...d, timeline: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select timeline</option>
                        <option value="Q2 2024">Q2 2024</option>
                        <option value="Q3 2024">Q3 2024</option>
                        <option value="Q4 2024">Q4 2024</option>
                        <option value="Q1 2025">Q1 2025</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pain Points</label>
                    {formData.painPoints.map((point, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={point}
                          onChange={e => updateListItem('painPoints', index, e.target.value)}
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                          placeholder="Enter pain point"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('painPoints', index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addListItem('painPoints')}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      + Add Pain Point
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={e => updateListItem('requirements', index, e.target.value)}
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                          placeholder="Enter requirement"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('requirements', index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addListItem('requirements')}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      + Add Requirement
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Stakeholders</label>
                      <button
                        type="button"
                        onClick={addStakeholder}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        + Add Stakeholder
                      </button>
                    </div>
                    {formData.stakeholders.map((stakeholder, index) => (
                      <div key={stakeholder.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                              type="text"
                              value={stakeholder.name}
                              onChange={e => updateStakeholder(index, { name: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                              type="text"
                              value={stakeholder.role}
                              onChange={e => updateStakeholder(index, { role: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              type="email"
                              value={stakeholder.email}
                              onChange={e => updateStakeholder(index, { email: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Influence</label>
                            <select
                              value={stakeholder.influence}
                              onChange={e => updateStakeholder(index, { influence: e.target.value as Stakeholder['influence'] })}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                              <option value="Decision Maker">Decision Maker</option>
                              <option value="Technical Evaluator">Technical Evaluator</option>
                              <option value="End User">End User</option>
                              <option value="Financial Approver">Financial Approver</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStakeholder(index)}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Stakeholder
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={e => setFormData(d => ({ ...d, notes: e.target.value }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      Add Customer
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}