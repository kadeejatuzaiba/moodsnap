
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    setError('');
    const user = { username, role };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e17] px-4">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-3xl" />

      <div className="relative w-full max-w-md animate-[fadeUp_0.5s_cubic-bezier(.22,.68,0,1.2)_both]">

        {/* Card */}
        <div className="relative rounded-2xl border border-white/[0.07] bg-[#16151f] px-8 py-10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">

          {/* Gold top line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent rounded-full" />

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-sm">
              ✦
            </div>
            <span className="text-[#f0ece4] text-xl font-semibold tracking-tight font-serif">
              MoodSnap
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-2xl font-medium text-[#f0ece4] font-serif mb-1">
            Welcome back
          </h2>
          <p className="text-center text-sm text-[#7c7a88] font-light mb-7">
            Sign in to your account to continue
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[10px] uppercase tracking-widest text-[#7c7a88] font-medium">
              Credentials
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-4">
              <label className="block mb-1.5 text-[11px] uppercase tracking-widest font-medium text-[#7c7a88]">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm text-[#f0ece4] placeholder-white/20 outline-none transition-all duration-200 focus:border-amber-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-500/15"
              />
            </div>

            {/* Role */}
            <div className="mb-2">
              <label className="block mb-1.5 text-[11px] uppercase tracking-widest font-medium text-[#7c7a88]">
                Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm text-[#f0ece4] outline-none transition-all duration-200 focus:border-amber-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-500/15 appearance-none cursor-pointer"
              >
                <option value="user" className="bg-[#1e1d28]">User</option>
                <option value="admin" className="bg-[#1e1d28]">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-3 text-sm font-semibold text-amber-950 tracking-wide shadow-[0_4px_20px_rgba(201,169,110,0.25)] transition-all duration-200 hover:opacity-90 hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(201,169,110,0.35)] active:translate-y-0 active:opacity-100"
            >
              Continue
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-[#7c7a88] font-light">
            Secure &amp; private · MoodSnap v2.0
          </p>
        </div>
      </div>

      {/* Keyframe for card entry */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}