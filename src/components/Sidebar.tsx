import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, ClipboardList, BarChart3, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  onSignOut: () => void;
}

export function Sidebar({ onSignOut }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || '';

  const navItems = [
    { icon: <Calendar className="w-5 h-5" />, label: "Schedule", path: '' },
    { icon: <Users className="w-5 h-5" />, label: "Customers", path: 'customers' },
    { icon: <ClipboardList className="w-5 h-5" />, label: "Preparation", path: 'preparation' },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", path: 'analytics' },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: 'settings' }
  ];

  return (
    <div className="w-64 bg-indigo-900 h-screen fixed left-0 top-0 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <Calendar className="w-8 h-8" />
        <h1 className="text-xl font-bold">DemoFlow</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              currentPath === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-red-300 hover:bg-red-900/20 mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}