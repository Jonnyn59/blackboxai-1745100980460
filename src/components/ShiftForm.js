import React, { useState, useEffect } from 'react';

const defaultColors = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
];

function ShiftForm({ date, shift, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [color, setColor] = useState(defaultColors[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  useEffect(() => {
    if (shift) {
      setTitle(shift.title || '');
      setComment(shift.comment || '');
      setColor(shift.color || defaultColors[0]);
      setStartTime(shift.startTime || '09:00');
      setEndTime(shift.endTime || '17:00');
    } else {
      setTitle('');
      setComment('');
      setColor(defaultColors[0]);
      setStartTime('09:00');
      setEndTime('17:00');
    }
  }, [shift]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    onSave(date, {
      id: shift ? shift.id : null,
      title,
      comment,
      color,
      startTime,
      endTime,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 w-full max-w-md sm:w-96 shadow-2xl transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300 flex items-center space-x-2">
          <i className="fas fa-calendar-alt"></i>
          <span>{shift ? 'Edit Shift' : 'Add Shift'} - {date.toDateString()}</span>
        </h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Comment</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Color</label>
          <div className="flex space-x-3">
            {defaultColors.map(c => (
              <button
                key={c}
                type="button"
                className={`w-10 h-10 rounded-full border-4 ${color === c ? 'border-indigo-700 dark:border-indigo-300' : 'border-transparent'} transition-transform transform hover:scale-110`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Start Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">End Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition"
            onClick={onCancel}
          >
            <i className="fas fa-times"></i>
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center space-x-2 transition"
          >
            <i className="fas fa-save"></i>
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShiftForm;
