import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Clock, Plus, Trash2, Calendar, X } from 'lucide-react';
import { usePreparationStore, ChecklistItem } from '../../store/preparationStore';
import { format } from 'date-fns';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<ChecklistItem, 'id'>) => void;
}

function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [formData, setFormData] = useState({
    task: '',
    category: '',
    priority: 'medium' as ChecklistItem['priority'],
    assignee: '',
    dueDate: '',
    notes: '',
    status: 'pending' as ChecklistItem['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      task: '',
      category: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      notes: '',
      status: 'pending'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add New Task</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task</label>
            <input
              type="text"
              required
              value={formData.task}
              onChange={e => setFormData(d => ({ ...d, task: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={e => setFormData(d => ({ ...d, category: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="e.g., Technical Setup, Content Preparation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={formData.priority}
              onChange={e => setFormData(d => ({ ...d, priority: e.target.value as ChecklistItem['priority'] }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={e => setFormData(d => ({ ...d, assignee: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={e => setFormData(d => ({ ...d, dueDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DemoPreparation() {
  const { checklist, toggleStatus, deleteItem, addItem } = usePreparationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const handleAddTask = (task: Omit<ChecklistItem, 'id'>) => {
    addItem({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Demo Preparation</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedChecklist).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-medium mb-4">{category}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="flex-shrink-0"
                  >
                    {getStatusIcon(item.status)}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.task}</p>
                        {item.assignee && (
                          <p className="text-sm text-gray-500">Assigned to: {item.assignee}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>

                    {(item.dueDate || item.notes) && (
                      <div className="mt-2 space-y-1">
                        {item.dueDate && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            Due: {format(item.dueDate, 'MMM d, yyyy')}
                          </div>
                        )}
                        {item.notes && (
                          <p className="text-sm text-gray-500">{item.notes}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedChecklist).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks yet. Click "Add Task" to create your first task.
          </div>
        )}
      </div>

      <NewTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}