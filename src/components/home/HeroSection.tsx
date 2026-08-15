

"use client";

import { useState, useEffect } from "react";
import { useTicketStore } from "@/store/ticket-store";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { drawDate, bumperPrize, lotterySubtitle, remainingTicketsCount } = useTicketStore();

  const [ticketsLeft, setTicketsLeft] = useState(remainingTicketsCount || 76);
  const totalTickets = 100;

  useEffect(() => {
    setIsMounted(true);
    setTicketsLeft(remainingTicketsCount || 76);
  }, [remainingTicketsCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicketsLeft((prev) => {
        if (prev <= 12) return 14;
        const isDecrease = Math.random() > 0.2;
        if (isDecrease) {
          const drop = Math.floor(Math.random() * 3) + 1;
          return Math.max(12, prev - drop);
        } else {
          return Math.min(88, prev + 1);
        }
      });
    }, Math.floor(Math.random() * 3000) + 3000);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.min(100, Math.max(15, (ticketsLeft / totalTickets) * 100));

  // 🎯 Dynamic Check: Clean string hai ya text filled hai?
  const hasDrawDate = isMounted && Boolean(drawDate && drawDate.trim() !== "");

  return (
    <div className="w-full bg-[#f4f6f8] text-[#111827] flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full bg-[#03543f] py-2 px-3 text-center text-[12px] sm:text-xs font-semibold text-white flex items-center justify-center gap-1 border-b border-emerald-900">
        🛡️ Government of Kerala Authorised Lottery Outlet • License Verified
      </div>

      <div className="w-full max-w-md   flex flex-col items-center text-center">
        
        {/* 🎯 Red Bar: Render ONLY if drawDate is provided in Admin */}
        {hasDrawDate && (
          <div className="w-full bg-[#b91c1c] py-1.5 px-3 flex justify-between items-center text-xs sm:text-sm font-bold tracking-wide text-white transition-all">
            <span className="flex items-center gap-2 uppercase">
              <span className="h-3.5 w-3.5 rounded-full pr-3 bg-red-600  inline-block font-extrabold" />
              TODAY'S DRAW DATE:
            </span>
            <span className="bg-white text-[#b91c1c] px-2 py-0.5 rounded font-mono font-extrabold">
              {drawDate}
            </span>
          </div>
        )}

        {/* Title & Crown */}
        <div className={`${hasDrawDate ? "mt-4" : "mt-1"} flex flex-col items-center transition-all`}>
          <span className="text-3xl">👑</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] tracking-tight font-serif">
            Kerala Mega Jackpot
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-600 font-bold tracking-wider uppercase mt-0.5">
            {isMounted ? lotterySubtitle : "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA"}
          </p>
        </div>

        {/* Bumper Prize Badge */}
        <div className="mt-2 bg-[#c25e00] text-white font-extrabold py-1.5 px-3 rounded-full shadow-md text-[11px] sm:text-xs flex items-center gap-1.5">
  🏆 {isMounted ? bumperPrize : "Bumper Prize ₹25 Crore"}
</div>

        {/* 🎯 Green Card: Render ONLY if drawDate is provided in Admin */}
        {hasDrawDate && (
          <div className="w-90 mt-2 bg-[#e6f4ea] border border-[#a8e0c2] rounded-xl py-1 px-1 flex flex-col items-center transition-all">
            <span className="text-[10px] text-[#064e3b] font-bold flex items-center gap-1">
              📅 OFFICIAL DRAW DATE
            </span>
            <span className="text-[13px] font-extrabold text-[#064e3b] font-mono mt-0.5">
              {drawDate}
            </span>
          </div>
        )}

        {/* Dynamic Scarcity Bar */}
        <div className="w-full mt-4 bg-gray-200 flex flex-col items-center gap-1.5 px-6 py-2">
  <p className="text-xs text-[#dc2626] font-extrabold flex items-center justify-center gap-1">
    🔥 Only{" "}
    <span className="font-mono text-sm underline transition-all duration-300">
      {ticketsLeft}
    </span>{" "}
    Official Tickets Left!
  </p>

  {/* Centered smaller bar */}
  <div className="w-[70%] bg-white h-2.5 rounded-full overflow-hidden">
    <div
      className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500 ease-out animate-pulse"
      style={{ width: `${progressPercentage}%` }}
    />
  </div>
</div>

        {/* Trust Badges */}
        {/* Trust Badges */}
<div className="w-full flex flex-wrap justify-center gap-2 mt-2 px-4">
  <div className="w-fit bg-[#e6f4ea] border border-[#b7e4c7] text-[9px] font-bold text-[#064e3b] py-1 px-2 rounded-md flex items-center justify-center gap-1 whitespace-nowrap">
    🔒 100% Safe
  </div>

  <div className="w-fit bg-[#e6f4ea] border border-[#b7e4c7] text-[9px] font-bold text-[#064e3b] py-1 px-2 rounded-md flex items-center justify-center gap-1 whitespace-nowrap">
    ✅ Govt Approved
  </div>

  <div className="w-fit bg-[#e6f4ea] border border-[#b7e4c7] text-[9px] font-bold text-[#064e3b] py-1 px-2 rounded-md flex items-center justify-center gap-1 whitespace-nowrap">
    ⚡ Fast Booking
  </div>
</div>

{/* Support Pill */}
<div className="mt-2 w-full flex justify-center">
  <div className="w-fit bg-[#e6f4ea] border border-[#b7e4c7] text-[9px] font-bold text-[#064e3b] py-1 px-3 rounded-md flex items-center gap-1 whitespace-nowrap">
    💬 Live WhatsApp Support
  </div>
</div>
  

      </div>
    </div>
  );
}