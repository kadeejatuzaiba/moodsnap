import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const emojiMap = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
  angry: '😡'
};

export default function Timeline({ moods, user, onMoodDeleted }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://moodsnap-backend.onrender.com/api/moods/${id}?role=${user.role}`);
          Swal.fire(
            'Deleted!',
            'The mood entry has been deleted.',
            'success'
          );
          onMoodDeleted();
        } catch (err) {
          console.error("Error deleting mood", err);
          Swal.fire('Error', 'Could not delete mood.', 'error');
        }
      }
    });
  };

  if (!moods || moods.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-slate-500">No moods recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        {user.role === 'admin' ? "All Users' Moods" : "Your Recent Moods (Last 10)"}
      </h3>
      <div className="flex flex-col gap-3">
        {moods.map(mood => (
          <div key={mood._id} className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="text-3xl">{emojiMap[mood.mood] || '❓'}</div>
            <div className="flex-1">
              <strong className="block text-lg capitalize text-slate-800">
                {user.role === 'admin' && <span className="text-indigo-600 font-bold mr-2">{mood.userId}</span>}
                {mood.mood}
              </strong>
              {mood.note && <p className="mt-1 text-sm text-slate-600">{mood.note}</p>}
              <span className="mt-2 block text-xs text-slate-400">
                {new Date(mood.createdAt).toLocaleString()}
              </span>
            </div>
            {user.role === 'admin' && (
              <button
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
                onClick={() => handleDelete(mood._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
