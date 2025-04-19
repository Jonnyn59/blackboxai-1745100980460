import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import ShiftForm from './components/ShiftForm';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [shifts, setShifts] = useState({});
  const [editingShift, setEditingShift] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const openShiftForm = (date, shift = null) => {
    setSelectedDate(date);
    setEditingShift(shift);
  };

  const closeShiftForm = () => {
    setSelectedDate(null);
    setEditingShift(null);
  };

  const saveShift = (date, shift) => {
    setShifts(prev => {
      const dateKey = date.toISOString().split('T')[0];
      const dayShifts = prev[dateKey] ? [...prev[dateKey]] : [];
      if (shift.id) {
        // Edit existing shift
        const index = dayShifts.findIndex(s => s.id === shift.id);
        if (index !== -1) {
          dayShifts[index] = shift;
        } else {
          dayShifts.push(shift);
        }
      } else {
        // Add new shift with id
        shift.id = Date.now();
        dayShifts.push(shift);
      }
      return { ...prev, [dateKey]: dayShifts };
    });
    closeShiftForm();
  };

  const deleteShift = (date, shiftId) => {
    setShifts(prev => {
      const dateKey = date.toISOString().split('T')[0];
      const dayShifts = prev[dateKey] ? prev[dateKey].filter(s => s.id !== shiftId) : [];
      return { ...prev, [dateKey]: dayShifts };
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 font-poppins transition-colors duration-500">
      <header className="max-w-full sm:max-w-4xl mx-auto mb-8 flex items-center justify-between px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 drop-shadow-md flex-grow">Work Shift Calendar</h1>
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="ml-4 p-2 rounded bg-indigo-700 text-white dark:bg-indigo-300 dark:text-indigo-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors duration-300"
        >
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </header>
      <main className="max-w-full sm:max-w-4xl mx-auto px-2 sm:px-0">
        <Calendar shifts={shifts} onDayClick={openShiftForm} onEditShift={openShiftForm} onDeleteShift={deleteShift} />
        {selectedDate && (
          <ShiftForm
            date={selectedDate}
            shift={editingShift}
            onSave={saveShift}
            onCancel={closeShiftForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
