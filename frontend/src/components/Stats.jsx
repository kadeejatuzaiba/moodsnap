import React from 'react';

const emojiMap = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
  angry: '😡'
};

export default function Stats({ stats, user }) {
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        {user.role === 'admin' ? "Global Statistics" : "Personal Statistics"}
      </h3>
      {total === 0 ? (
        <p className="text-slate-500">No stats available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(stats).map(([mood, count]) => (
            <div key={mood} className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-4 border border-slate-100">
              <span className="text-3xl mb-2">{emojiMap[mood] || '❓'}</span>
              <span className="text-2xl font-bold text-slate-800">{count}</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{mood}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
