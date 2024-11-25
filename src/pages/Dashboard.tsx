import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { SchedulingCalendar } from '../components/scheduling/SchedulingCalendar';
import { CustomerProfile } from '../components/customer/CustomerProfile';
import { DemoPreparation } from '../components/preparation/DemoPreparation';
import { NewDemoModal } from '../components/modals/NewDemoModal';
import { NotificationsPanel } from '../components/notifications/NotificationsPanel';
import { AnalyticsView } from '../components/analytics/AnalyticsView';
import { UserSettings } from '../components/settings/UserSettings';

export type ActiveView = 'schedule' | 'customers' | 'preparation' | 'analytics' | 'settings';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDemoModalOpen, setIsNewDemoModalOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onSignOut={handleSignOut} />
      <Header 
        user={user}
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onNotificationsClick={() => setIsNotificationsPanelOpen(true)}
      />
      
      <main className="pl-64 pt-16">
        <div className="p-8 max-w-7xl mx-auto">
          <Routes>
            <Route 
              path="/" 
              element={
                <SchedulingCalendar 
                  searchQuery={searchQuery}
                  onNewDemo={() => setIsNewDemoModalOpen(true)}
                />
              } 
            />
            <Route path="/customers" element={<CustomerProfile />} />
            <Route path="/preparation" element={<DemoPreparation />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div>
      </main>

      <NewDemoModal 
        isOpen={isNewDemoModalOpen}
        onClose={() => setIsNewDemoModalOpen(false)}
      />
      
      <NotificationsPanel
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
      />
    </div>
  );
}