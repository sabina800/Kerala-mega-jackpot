"use client";

import { useState, useEffect } from "react";
import { DynamicDate } from "./DynamicDate";

export function HeroSection() {
  // Dynamic Scarcity State
  const [ticketsLeft, setTicketsLeft] = useState(76);
  const totalTickets = 100; // Reference maximum for percentage calculation

  useEffect(() => {
    // Har 3 se 6 seconds me count fluctuate / decrease hoga
    const interval = setInterval(() => {
      setTicketsLeft((prev) => {
        // Minimum limit guard (ex: 12 tickets se niche nahi jayega)
        if (prev <= 12) return 14;

        // Random chance: 80% chance to decrease, 20% chance to slightly fluctuate (+1)
        const isDecrease = Math.random() > 0.2;
        if (isDecrease) {
          const drop = Math.floor(Math.random() * 3) + 1; // Drops by 1, 2, or 3
          return Math.max(12, prev - drop);
        } else {
          return Math.min(88, prev + 1); // Slight increase for dynamic feel
        }
      });
    }, Math.floor(Math.random() * 3000) + 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic progress bar percentage
  const progressPercentage = Math.min(100, Math.max(15, (ticketsLeft / totalTickets) * 100));

  return (
    <div className="w-full bg-[#f4f6f8] text-[#111827] flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full bg-[#03543f] py-2 px-3 text-center text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1 border-b border-emerald-800">
        🛡️ Government of Kerala Authorised Lottery Outlet • License Verified
      </div>

      <div className="w-full max-w-md px-4 pt-4 flex flex-col items-center text-center">
        {/* Red Today's Draw Bar */}
        <div className="w-full bg-[#b91c1c] rounded-md py-1.5 px-3 flex justify-between items-center text-xs sm:text-sm font-bold tracking-wide text-white">
          <span className="flex items-center gap-2 uppercase">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300 animate-ping inline-block" />
            TODAY'S DRAW DATE:
          </span>
          <span className="bg-white text-[#b91c1c] px-2 py-0.5 rounded font-mono font-extrabold">
            <DynamicDate />
          </span>
        </div>

        {/* Title & Crown */}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-3xl">👑</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] tracking-tight font-serif">
            Kerala Mega Jackpot
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-600 font-bold tracking-wider uppercase mt-0.5">
            OFFICIAL STATE LOTTERY DIRECTORATE • KERALA
          </p>
        </div>

        {/* Bumper Prize Badge */}
        <div className="mt-3 bg-[#c25e00] text-white font-extrabold py-2 px-6 rounded-full shadow-md text-base sm:text-lg flex items-center gap-2">
          🏆 Bumper Prize ₹25 Crore
        </div>

        {/* Draw Date Card */}
        <div className="w-full mt-4 bg-[#e6f4ea] border border-[#a8e0c2] rounded-xl py-3 px-4 flex flex-col items-center">
          <span className="text-xs text-[#064e3b] font-bold flex items-center gap-1">
            📅 OFFICIAL DRAW DATE
          </span>
          <span className="text-lg font-bold text-[#064e3b] font-mono mt-0.5">
            <DynamicDate />
          </span>
        </div>

        {/* Dynamic Scarcity Bar */}
        <div className="w-full mt-4 flex flex-col gap-1.5 pr-15 pl-15">
          <p className="text-xs text-[#dc2626] font-extrabold flex items-center justify-center gap-1">
            🔥 Only <span className="font-mono text-sm underline transition-all duration-300">{ticketsLeft}</span> Official Tickets Left!
          </p>
          <div className="w-full  bg-[#e5e7eb] h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500 ease-out animate-pulse "
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          <div className="bg-[#e6f4ea] border border-[#b7e4c7] text-[11px] font-bold text-[#064e3b] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1">
            🔒 100% Safe
          </div>
          <div className="bg-[#e6f4ea] border border-[#b7e4c7] text-[11px] font-bold text-[#064e3b] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1">
            ✅ Govt Approved
          </div>
          <div className="bg-[#e6f4ea] border border-[#b7e4c7] text-[11px] font-bold text-[#064e3b] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1">
            ⚡ Fast Booking
          </div>
        </div>

        {/* Support Pill */}
        <div className="mt-2 w-full flex justify-center">
          <div className="bg-[#e6f4ea] border border-[#b7e4c7] text-[11px] font-bold text-[#064e3b] py-1.5 px-4 rounded-full flex items-center gap-1">
            💬 Live WhatsApp Support
          </div>
        </div>
      </div>
    </div>
  );
}