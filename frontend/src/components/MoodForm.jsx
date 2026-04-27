import React, { useState } from 'react';
import axios from 'axios';

const MOODS = [
  { emoji: '😊', label: 'happy', color: 'hover:bg-green-100 hover:text-green-600', active: 'bg-green-200 ring-4 ring-green-300' },
  { emoji: '😢', label: 'sad', color: 'hover:bg-blue-100 hover:text-blue-600', active: 'bg-blue-200 ring-4 ring-blue-300' },
  { emoji: '😐', label: 'neutral', color: 'hover:bg-gray-100 hover:text-gray-600', active: 'bg-gray-200 ring-4 ring-gray-300' },
  { emoji: '😡', label: 'angry', color: 'hover:bg-red-100 hover:text-red-600', active: 'bg-red-200 ring-4 ring-red-300' },
];

export default function MoodForm({ user, onMoodAdded }) {
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    try {
      await axios.post('https://moodsnap-backend.onrender.com/api/moods', {
        userId: user.username,
        mood: selectedMood,
        note
      });
      setNote('');
      setSelectedMood(null);
      onMoodAdded();
    } catch (err) {
      console.error("Error adding mood", err);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">How are you feeling today?</h3>

      <div className="mb-6 flex justify-center gap-4">
        {MOODS.map(m => {
          const isSelected = selectedMood === m.label;
          return (
            <button
              key={m.label}
              className={`flex h-16 w-16 items-center justify-center rounded-full text-4xl transition-all duration-200 ${m.color} ${isSelected ? m.active : 'bg-slate-50'}`}
              onClick={() => setSelectedMood(m.label)}
              title={m.label}
            >
              {m.emoji}
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="animate-fade-in-up">
          <input
            type="text"
            placeholder="Add an optional note about why..."
            value={note}
            onChange={e => setNote(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Save Mood
          </button>
        </div>
      )}
    </div>
  );
}
