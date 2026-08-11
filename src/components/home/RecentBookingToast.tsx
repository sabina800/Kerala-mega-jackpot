'use client';

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { BookingToast } from '@/types/tickets';

const SAMPLE_BOOKINGS: BookingToast[] = [
  {
    id: '1',
    name: 'Gaurav',
    location: 'Kochi',
    ticketNumber: 'KL723789',
    timeAgo: '3m ago',
  },
  {
    id: '2',
    name: 'Anish',
    location: 'Thiruvananthapuram',
    ticketNumber: 'KL404525',
    timeAgo: '1m ago',
  },
  {
    id: '3',
    name: 'Rahul',
    location: 'Kozhikode',
    ticketNumber: 'KL324223',
    timeAgo: 'Just now',
  },
];

export default function RecentBookingToast() {
  const [currentToastIndex, setCurrentToastIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Hide current toast
      setIsVisible(false);

      // Change toast data after fade out transition (500ms)
      setTimeout(() => {
        setCurrentToastIndex((prev) => (prev + 1) % SAMPLE_BOOKINGS.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const toast = SAMPLE_BOOKINGS[currentToastIndex];

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 transition-all duration-500 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-[#0b1328]/95 border border-[#1e2f54] backdrop-blur-md rounded-2xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 max-w-[270px]">
        {/* Profile Avatar Badge */}
        <div className="w-9 h-9 rounded-full bg-[#facc15] text-[#070d1e] font-black text-base flex items-center justify-center shrink-0 shadow-md">
          {toast.name.charAt(0)}
        </div>

        {/* Text Content */}
        <div className="flex flex-col text-left overflow-hidden">
          <div className="text-xs font-bold text-white truncate">
            {toast.name} · <span className="text-slate-300 font-normal">{toast.location}</span>
          </div>

          <div className="text-[11px] font-medium text-slate-300 truncate mt-0.5">
            just booked{' '}
            <span className="text-[#facc15] font-bold font-mono">
              #{toast.ticketNumber}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 mt-0.5">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Booking Confirmed · {toast.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}