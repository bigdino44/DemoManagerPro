import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Info } from 'lucide-react';
import { useDemoStore, DemoLocationType } from '../../store/demoStore';
import { demoTypes } from '../../store/demoTypes';

interface NewDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDemoModal({ isOpen, onClose }: NewDemoModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    type: '',
    location: '' as DemoLocationType,
    locationDetails: '',
    attendees: 1,
    time: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [showTypeInfo, setShowTypeInfo] = useState<string | null>(null);
  const addDemo = useDemoStore(state => state.addDemo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDemo({
      ...formData,
      date: new Date(formData.date)
    });
    onClose();
  };

  const locationTypes: DemoLocationType[] = ['Virtual', 'Nexus', 'On-site', 'On-location'];

  const showLocationDetails = formData.location !== 'Virtual';

  const validateDate = (date: string, location: DemoLocationType) => {
    if (location === 'On-site') {
      const selectedDate = new Date(date);
      return selectedDate.getDay() === 5; // Friday is 5
    }
    return true;
  };

  const validateTime = (time: string, location: DemoLocationType) => {
    if (location === 'On-site') {
      return time >= '10:00' && time <= '13:00';
    }
    return true;
  };

  const getLocationHelperText = (location: DemoLocationType) => {
    switch (location) {
      case 'On-site':
        return 'Available only on Fridays, 10:00 AM - 1:00 PM';
      case 'On-location':
        return 'Premium service with dedicated team travel';
      case 'Nexus':
        return 'Regional hub event with special activities';
      case 'Virtual':
        return 'Online demonstration with cost breakdown';
      default:
        return '';
    }
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Schedule New Demo</h3>
                  <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData(d => ({ ...d, company: e.target.value }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Demo Type</label>
                    <div className="mt-1 relative">
                      <select
                        required
                        value={formData.location}
                        onChange={e => {
                          const location = e.target.value as DemoLocationType;
                          setFormData(d => ({
                            ...d,
                            location,
                            date: location === 'On-site' ? '' : d.date,
                            time: location === 'On-site' ? '10:00' : d.time
                          }));
                        }}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                      >
                        <option value="">Select type</option>
                        {locationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {formData.location && (
                        <button
                          type="button"
                          onClick={() => setShowTypeInfo(formData.location)}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          <Info className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                    {formData.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        {getLocationHelperText(formData.location)}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => {
                          if (validateDate(e.target.value, formData.location)) {
                            setFormData(d => ({ ...d, date: e.target.value }));
                          }
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={e => {
                          if (validateTime(e.target.value, formData.location)) {
                            setFormData(d => ({ ...d, time: e.target.value }));
                          }
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>

                  {showLocationDetails && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {formData.location === 'Nexus' ? 'Hub Location' : 'Address'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.locationDetails}
                        onChange={e => setFormData(d => ({ ...d, locationDetails: e.target.value }))}
                        placeholder={formData.location === 'Nexus' ? 'Select regional hub' : 'Enter address'}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Attendees</label>
                    <input
                      type="number"
                      min="1"
                      max={formData.location ? demoTypes[formData.location.toLowerCase()]?.capacity || 999 : 999}
                      required
                      value={formData.attendees}
                      onChange={e => setFormData(d => ({ ...d, attendees: parseInt(e.target.value) }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
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
                      Schedule Demo
                    </button>
                  </div>
                </form>

                {showTypeInfo && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md">
                      <h3 className="text-lg font-medium mb-2">{demoTypes[showTypeInfo.toLowerCase()].name}</h3>
                      <p className="text-gray-600 mb-4">{demoTypes[showTypeInfo.toLowerCase()].description}</p>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Duration:</strong> {demoTypes[showTypeInfo.toLowerCase()].duration}</p>
                        <p className="text-sm"><strong>Max Capacity:</strong> {demoTypes[showTypeInfo.toLowerCase()].capacity} attendees</p>
                        {demoTypes[showTypeInfo.toLowerCase()].cost && (
                          <p className="text-sm"><strong>Cost:</strong> {demoTypes[showTypeInfo.toLowerCase()].cost}</p>
                        )}
                        <div className="mt-4">
                          <strong className="text-sm">Features:</strong>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {demoTypes[showTypeInfo.toLowerCase()].features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTypeInfo(null)}
                        className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}