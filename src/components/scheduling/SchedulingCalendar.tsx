import React, { useState } from 'react';
import { Clock, MapPin, Users2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDemoStore, Demo } from '../../store/demoStore';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay, addWeeks, subWeeks } from 'date-fns';

interface SchedulingCalendarProps {
  searchQuery: string;
  onNewDemo: () => void;
}

export function SchedulingCalendar({ searchQuery, onNewDemo }: SchedulingCalendarProps) {
  const demos = useDemoStore(state => state.demos);
  const selectedDate = useDemoStore(state => state.selectedDate);
  const selectedDemoId = useDemoStore(state => state.selectedDemoId);
  const setSelectedDate = useDemoStore(state => state.setSelectedDate);
  const setSelectedDemoId = useDemoStore(state => state.setSelectedDemoId);

  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: endOfWeek(currentWeek, { weekStartsOn: 1 })
  });

  const getDemosForDate = (date: Date) => {
    return demos.filter(demo => 
      isSameDay(new Date(demo.date), date) &&
      (demo.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
       demo.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const getLocationLabel = (demo: Demo) => {
    switch (demo.location) {
      case 'Virtual':
        return 'Virtual Meeting';
      case 'Nexus':
        return `Nexus Hub: ${demo.locationDetails}`;
      case 'On-site':
        return `On-site: ${demo.locationDetails}`;
      case 'On-location':
        return `Location: ${demo.locationDetails}`;
      default:
        return demo.location;
    }
  };

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9; // Start from 9 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentWeek(prev => subWeeks(prev, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(currentWeek, 'MMMM d')} - {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), 'MMMM d, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentWeek(prev => addWeeks(prev, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onNewDemo}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Demo
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {weekDays.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`p-3 rounded-lg text-center ${
                isToday(day) ? 'bg-indigo-50 text-indigo-600' :
                isSameDay(day, selectedDate) ? 'bg-gray-100' :
                'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium">{format(day, 'EEE')}</div>
              <div className="text-lg">{format(day, 'd')}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y">
        {timeSlots.map((time) => {
          const demosAtTime = getDemosForDate(selectedDate).filter(
            demo => demo.time.startsWith(time.split(':')[0])
          );

          return (
            <div key={time} className="flex">
              <div className="w-24 p-4 border-r text-sm text-gray-500">
                {time}
              </div>
              <div className="flex-1 p-2">
                {demosAtTime.map((demo) => (
                  <div 
                    key={demo.id}
                    onClick={() => setSelectedDemoId(demo.id)}
                    className={`mx-2 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedDemoId === demo.id ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{demo.company}</h4>
                      <span className="text-sm text-gray-500">{demo.time}</span>
                    </div>
                    <div className="mt-1 flex gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {getLocationLabel(demo)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users2 className="w-4 h-4" />
                        {demo.attendees} attendees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}