'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Zap, MessageSquare, Timer } from 'lucide-react';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 44,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full bg-[#070d1e] text-white flex flex-col items-center">
      {/* Announcement Bar */}
      <div className="w-full bg-[#d33a2c] py-2 px-4 text-center font-bold text-[11px] tracking-wider text-white flex items-center justify-center gap-2 shadow-md">
        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
        <span>LIVE DRAW — LIMITED TICKETS AVAILABLE</span>
      </div>

      <div className="w-full px-4 pt-5 pb-4 flex flex-col items-center text-center">
        {/* Crown Logo with Radial Glow */}
        <div className="relative mb-2 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#e8b931]/20 blur-xl rounded-full w-12 h-12 -z-0" />
          <div className="text-3xl select-none relative z-10 filter drop-shadow-[0_0_12px_rgba(232,185,49,0.8)]">
            👑
          </div>
        </div>

        {/* Kerala Mega Jackpot Title */}
        <h1 className="text-[25px] font-black tracking-tight leading-tight font-serif text-white">
          Kerala <span className="text-[#facc15]">Mega Jackpot</span>
        </h1>

        {/* Official Government Text */}
        <p className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase mt-1">
          OFFICIAL GOVERNMENT LOTTERY · TRUSTED SINCE 1967
        </p>

        {/* Gold Prize Button */}
        <div className="mt-4 w-full max-w-[270px]">
          <div className="bg-gradient-to-r from-[#d4af37] via-[#facc15] to-[#c59b27] text-slate-950 font-extrabold text-sm py-2 px-5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] border border-[#fff2a1] flex items-center justify-center gap-1.5">
            <span className="text-base">🏆</span>
            <span>First Prize ₹25 Crore</span>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="mt-6 w-full px-1">
          <div className="flex items-center justify-center gap-3">
            {/* Draw Closes In Label */}
            <div className="flex items-center gap-1 text-[11px] font-black text-[#e53e3e] uppercase tracking-wider">
              <Timer className="w-3.5 h-3.5 text-[#e53e3e]" />
              <span>DRAW CLOSES IN</span>
            </div>

            {/* Timer Digits and Blinking Colons */}
            <div className="flex items-center gap-1.5">
              {/* Hours Box */}
              <div className="bg-[#10182e] border border-[#1d2b4e] rounded-xl py-1.5 px-3 flex flex-col items-center shadow-lg min-w-[56px]">
                <span className="text-xl font-black text-[#facc15] leading-none font-serif">
                  {formatTwoDigits(timeLeft.hours)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  HOURS
                </span>
              </div>

              {/* Continuously Blinking Yellow Colon */}
              <span className="text-[#facc15] font-black text-lg animate-pulse select-none">
                :
              </span>

              {/* Minutes Box */}
              <div className="bg-[#10182e] border border-[#1d2b4e] rounded-xl py-1.5 px-3 flex flex-col items-center shadow-lg min-w-[56px]">
                <span className="text-xl font-black text-[#facc15] leading-none font-serif">
                  {formatTwoDigits(timeLeft.minutes)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  MINS
                </span>
              </div>

              {/* Continuously Blinking Yellow Colon */}
              <span className="text-[#facc15] font-black text-lg animate-pulse select-none">
                :
              </span>

              {/* Seconds Box */}
              <div className="bg-[#10182e] border border-[#1d2b4e] rounded-xl py-1.5 px-3 flex flex-col items-center shadow-lg min-w-[56px]">
                <span className="text-xl font-black text-[#facc15] leading-none font-serif">
                  {formatTwoDigits(timeLeft.seconds)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  SECS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VIP Remaining & Gradient Progress Bar */}
        <div className="mt-5 w-full px-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#e53e3e] mb-2">
            <span>🔥</span>
            <span>Only 42 VIP Tickets Remaining!</span>
          </div>
          <div className="w-full bg-[#10182e] h-2 rounded-full overflow-hidden border border-[#1d2b4e] p-0.5">
            <div className="bg-gradient-to-r from-[#e53e3e] via-[#f97316] to-[#facc15] h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-2 mt-6 w-full text-center px-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <Lock className="w-3.5 h-3.5 text-[#facc15]" />
            <span>100% Secure</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Govt Certified</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <Zap className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Instant Booking</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-300 mt-3">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
          <span>WhatsApp Support</span>
        </div>
      </div>
    </div>
  );
}