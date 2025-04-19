import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

function Calendar({ shifts, onDayClick, onEditShift, onDeleteShift }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayKey = day.toISOString().split('T')[0];
      const dayShifts = shifts[dayKey] || [];
      formattedDate = format(day, dateFormat);
      days.push(
        <div
          key={day}
          className={`border border-gray-300 p-3 h-24 sm:h-32 flex flex-col cursor-pointer rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-lg ${!isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400' : 'bg-white dark:bg-gray-800 dark:text-gray-200'} ${isSameDay(day, new Date()) ? 'ring-2 ring-indigo-400' : ''}`}
          onClick={() => onDayClick(day)}
        >
          <div className="text-xs sm:text-sm font-semibold mb-2 text-indigo-700 dark:text-indigo-300">{formattedDate}</div>
          <div className="flex-1 overflow-auto space-y-1">
            {dayShifts.map(shift => (
              <div
                key={shift.id}
                className="mb-1 rounded px-2 py-1 text-xs text-white flex justify-between items-center shadow-md transition-colors duration-300"
                style={{ backgroundColor: shift.color || '#6366f1' }}
                onClick={e => {
                  e.stopPropagation();
                  onEditShift(day, shift);
                }}
              >
                <span className="truncate max-w-[70%]" title={shift.title}>{shift.title}</span>
                <button
                  className="ml-2 text-white hover:text-gray-200"
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteShift(day, shift.id);
                  }}
                  aria-label="Delete shift"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 mb-2" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-4 max-w-full sm:max-w-4xl mx-auto px-2 sm:px-0">
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          className="p-2 rounded hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-700"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-indigo-700 dark:text-indigo-300 mx-4">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          className="p-2 rounded hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-700"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 mb-4 max-w-full sm:max-w-4xl mx-auto px-2 sm:px-0">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-semibold text-indigo-700 dark:text-indigo-300">{day}</div>
        ))}
      </div>
      {rows}
    </div>
  );
}

export default Calendar;
