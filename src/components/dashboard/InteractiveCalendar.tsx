'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { DailyPull } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';

interface InteractiveCalendarProps {
  pulls: DailyPull[];
  className?: string;
  onDateClick?: (date: Date, pulls: DailyPull[]) => void;
}

const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({ 
  pulls, 
  className = '',
  onDateClick 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Get the month's date range
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Generate all dates for the calendar grid
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Group pulls by date for quick lookup
  const pullsByDate = useMemo(() => {
    const grouped: Record<string, DailyPull[]> = {};
    pulls.forEach(pull => {
      const dateKey = format(new Date(pull.pull_date), 'yyyy-MM-dd');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(pull);
    });
    return grouped;
  }, [pulls]);

  // Navigation functions
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Check if a date has pulls
  const getPullsForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return pullsByDate[dateKey] || [];
  };

  // Get pull type indicators
  const getPullIndicators = (date: Date) => {
    const pulls = getPullsForDate(date);
    if (pulls.length === 0) return null;

    const hasDigital = pulls.some(pull => pull.pull_type === 'digital');
    const hasPhysical = pulls.some(pull => pull.pull_type === 'physical');
    const hasReversed = pulls.some(pull => pull.is_reversed);
    const hasNotes = pulls.some(pull => pull.notes);

    return (
      <div className="flex flex-wrap gap-0.5 justify-center">
        {hasDigital && (
          <div className="w-1.5 h-1.5 bg-emerald-whisper rounded-full" title="Digital Pull" />
        )}
        {hasPhysical && (
          <div className="w-1.5 h-1.5 bg-astral-gold rounded-full" title="Physical Pull" />
        )}
        {hasReversed && (
          <div className="w-1.5 h-1.5 bg-crimson-stain rounded-full" title="Reversed Card" />
        )}
        {hasNotes && (
          <div className="w-1.5 h-1.5 bg-lunar-glow rounded-full" title="Has Notes" />
        )}
      </div>
    );
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    const pulls = getPullsForDate(date);
    if (pulls.length > 0 && onDateClick) {
      onDateClick(date, pulls);
    }
  };

  // Check if date is today
  const isToday = (date: Date) => isSameDay(date, new Date());

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => isSameMonth(date, currentDate);

  // Get month statistics
  const monthStats = useMemo(() => {
    const monthPulls = pulls.filter(pull => isSameMonth(new Date(pull.pull_date), currentDate));
    const totalPulls = monthPulls.length;
    const digitalPulls = monthPulls.filter(pull => pull.pull_type === 'digital').length;
    const physicalPulls = monthPulls.filter(pull => pull.pull_type === 'physical').length;
    const reversedPulls = monthPulls.filter(pull => pull.is_reversed).length;
    const notesCount = monthPulls.filter(pull => pull.notes).length;

    return { totalPulls, digitalPulls, physicalPulls, reversedPulls, notesCount };
  }, [pulls, currentDate]);

  return (
    <div className={`card ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cinzel font-semibold text-lunar-glow">
          <CalendarIcon className="inline w-5 h-5 mr-2" />
          Reading History
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 text-lunar-glow hover:text-astral-gold transition-colors rounded-lg hover:bg-midnight-aura"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm text-lunar-glow hover:text-astral-gold transition-colors rounded-lg hover:bg-midnight-aura"
          >
            Today
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 text-lunar-glow hover:text-astral-gold transition-colors rounded-lg hover:bg-midnight-aura"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month/Year Display */}
      <div className="text-center mb-6">
        <h4 className="text-2xl font-cinzel font-bold text-lunar-glow">
          {format(currentDate, 'MMMM yyyy')}
        </h4>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-lunar-glow opacity-70"
          >
            {day}
          </div>
        ))}

        {/* Calendar dates */}
        {dates.map((date, index) => {
          const pulls = getPullsForDate(date);
          const hasPulls = pulls.length > 0;
          const isCurrentMonthDate = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          const isHovered = hoveredDate && isSameDay(date, hoveredDate);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              className={`
                relative p-2 min-h-[60px] border border-transparent rounded-lg transition-all cursor-pointer group
                ${isCurrentMonthDate ? 'text-lunar-glow' : 'text-lunar-glow opacity-30'}
                ${isTodayDate ? 'bg-astral-gold bg-opacity-20 border-astral-gold' : ''}
                ${hasPulls ? 'bg-emerald-whisper bg-opacity-10 border-emerald-whisper border-opacity-30' : ''}
                ${!isCurrentMonthDate ? 'bg-midnight-aura bg-opacity-20' : ''}
                ${isHovered ? 'bg-midnight-aura bg-opacity-50 scale-105' : 'hover:bg-midnight-aura hover:bg-opacity-30'}
                ${hasPulls ? 'hover:border-emerald-whisper hover:border-opacity-60' : ''}
              `}
            >
              {/* Date number */}
              <div className="text-sm font-medium mb-1">
                {format(date, 'd')}
              </div>

              {/* Pull indicators */}
              {hasPulls && (
                <div className="mb-1">
                  {getPullIndicators(date)}
                </div>
              )}

              {/* Pull count */}
              {hasPulls && (
                <div className="text-xs text-emerald-whisper font-medium">
                  {pulls.length} pull{pulls.length > 1 ? 's' : ''}
                </div>
              )}

              {/* Today indicator */}
              {isTodayDate && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-astral-gold rounded-full" />
              )}

              {/* Hover tooltip for dates with pulls */}
              {isHovered && hasPulls && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-deep-void border border-lunar-glow border-opacity-30 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="text-xs text-lunar-glow font-medium mb-2">
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </div>
                  {pulls.map((pull, idx) => (
                    <div key={idx} className="text-xs text-lunar-glow opacity-80 mb-1">
                      • {pull.card?.card_name} ({pull.pull_type})
                      {pull.is_reversed && ' (Reversed)'}
                      {pull.notes && ' 📝'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Summary Stats */}
      <div className="mt-6 pt-4 border-t border-lunar-glow border-opacity-20">
        <h5 className="text-sm font-medium text-lunar-glow mb-3">Month Summary</h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="text-center p-2 bg-midnight-aura bg-opacity-20 rounded-lg">
            <div className="text-astral-gold font-bold text-lg">{monthStats.totalPulls}</div>
            <div className="text-lunar-glow opacity-70">Total</div>
          </div>
          <div className="text-center p-2 bg-midnight-aura bg-opacity-20 rounded-lg">
            <div className="text-emerald-whisper font-bold text-lg">{monthStats.digitalPulls}</div>
            <div className="text-lunar-glow opacity-70">Digital</div>
          </div>
          <div className="text-center p-2 bg-midnight-aura bg-opacity-20 rounded-lg">
            <div className="text-astral-gold font-bold text-lg">{monthStats.physicalPulls}</div>
            <div className="text-lunar-glow opacity-70">Physical</div>
          </div>
          <div className="text-center p-2 bg-midnight-aura bg-opacity-20 rounded-lg">
            <div className="text-crimson-stain font-bold text-lg">{monthStats.reversedPulls}</div>
            <div className="text-lunar-glow opacity-70">Reversed</div>
          </div>
          <div className="text-center p-2 bg-midnight-aura bg-opacity-20 rounded-lg">
            <div className="text-lunar-glow font-bold text-lg">{monthStats.notesCount}</div>
            <div className="text-lunar-glow opacity-70">Notes</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-lunar-glow border-opacity-20">
        <h5 className="text-sm font-medium text-lunar-glow mb-3">Legend</h5>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-whisper rounded-full" />
            <span className="text-lunar-glow opacity-70">Digital Pull</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-astral-gold rounded-full" />
            <span className="text-lunar-glow opacity-70">Physical Pull</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-crimson-stain rounded-full" />
            <span className="text-lunar-glow opacity-70">Reversed Card</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-lunar-glow rounded-full" />
            <span className="text-lunar-glow opacity-70">Has Notes</span>
          </div>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="mt-4 p-3 bg-emerald-whisper bg-opacity-10 border border-emerald-whisper border-opacity-30 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-emerald-whisper">
          <Info className="w-4 h-4" />
          <span>Click on dates with pulls to see details</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalendar;
