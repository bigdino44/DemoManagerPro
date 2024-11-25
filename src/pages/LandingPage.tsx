import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users2, BarChart3, ClipboardList } from 'lucide-react';

export function LandingPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Smart Scheduling',
      description: 'Efficiently manage your demo calendar with intelligent scheduling tools'
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: 'Customer Management',
      description: 'Keep track of all customer interactions and preferences in one place'
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: 'Demo Preparation',
      description: 'Streamline your demo preparation with customizable checklists'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with comprehensive analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DemoFlow</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Streamline Your Product Demos
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
              The all-in-one platform for managing product demonstrations, customer relationships, and demo analytics.
            </p>
            {!user && (
              <div className="mt-8">
                <Link
                  to="/sign-up"
                  className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Start Free Trial
                </Link>
              </div>
            )}
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="p-2 bg-indigo-50 rounded-lg w-fit">
                    {React.cloneElement(feature.icon, { className: 'w-6 h-6 text-indigo-600' })}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}