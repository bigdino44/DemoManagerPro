import React from 'react';
import { Bell, Search } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
}

interface HeaderProps {
  user: User | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNotificationsClick: () => void;
}

export function Header({ user, searchQuery, onSearchChange, onNotificationsClick }: HeaderProps) {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white border-b flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search demos, customers..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onNotificationsClick}
          className="p-2 hover:bg-gray-100 rounded-lg relative"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {user && (
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        )}
      </div>
    </header>
  );
}