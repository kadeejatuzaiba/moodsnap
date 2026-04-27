
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoodForm from './MoodForm';
import Timeline from './Timeline';
import Stats from './Stats';

export default function Dashboard({ user, onLogout }) {
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    try {
      const [moodsRes, statsRes] = await Promise.all([
        axios.get(`https://moodsnap-backend.onrender.com/api/moods?userId=${user.username}&role=${user.role}`),
        axios.get(`https://moodsnap-backend.onrender.com/api/stats?userId=${user.username}&role=${user.role}`)

      ]);
      setMoods(moodsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0f0e17] px-4 py-6 md:px-6 lg:px-8">

      {/* Ambient glows — same as Login */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* ── Header ── */}
        <header className="relative mb-8 flex items-center justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#16151f] px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Gold hairline */}
          <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-br from-amber-400 to-amber-700 text-sm">
              ✦
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-[#f0ece4]">
              MoodSnap
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* User badge */}
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-1.5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#7c7a88]">
                {user.role}
              </span>
              <div className="h-3 w-px bg-white/10" />
              <span className="text-sm font-medium text-amber-400">
                {user.username}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 active:scale-95"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ── Grid ── */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* MoodForm — user only */}
          {user.role === 'user' && (
            <div className="md:col-span-1">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#16151f] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <div className="p-5">
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-[#7c7a88]">
                    Log Mood
                  </p>
                  <MoodForm user={user} onMoodAdded={fetchData} />
                </div>
              </div>
            </div>
          )}

          {/* Stats + Timeline */}
          <div className={`flex flex-col gap-6 ${user.role === 'user' ? 'md:col-span-2' : 'md:col-span-3'}`}>

            {/* Stats card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#16151f] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <div className="p-5">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-[#7c7a88]">
                  Overview
                </p>
                <Stats stats={stats} user={user} />
              </div>
            </div>

            {/* Timeline card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#16151f] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <div className="p-5">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-[#7c7a88]">
                  Timeline
                </p>
                <Timeline moods={moods} user={user} onMoodDeleted={fetchData} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}