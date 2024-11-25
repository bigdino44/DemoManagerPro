import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Bell, Shield, Globe } from 'lucide-react';

export function UserSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.imageUrl}
            alt={user?.name || 'Profile'}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="font-medium">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Preferences
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Demo reminders</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Customer updates</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Weekly reports</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notification Settings
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Push notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Browser notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">SMS notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Preferences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Regional Settings
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date Format</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-sm">Share analytics with team</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-indigo-600" />
                <span className="text-sm">Public profile</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}