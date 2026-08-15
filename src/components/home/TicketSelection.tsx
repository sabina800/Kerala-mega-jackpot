
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTicketStore } from '@/store/ticket-store';
// import { AlertTriangle, Ticket as TicketIcon, Check, RefreshCw } from 'lucide-react';

// export default function TicketSelection() {
//   const { tickets, selectedTicketIds, toggleTicket, regenerateTickets } = useTicketStore();
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     regenerateTickets(); // Generate on browser load

//     const interval = setInterval(() => {
//       regenerateTickets();
//     }, 60000); // 1 minute auto refresh

//     return () => clearInterval(interval);
//   }, [regenerateTickets]);

//   // Prevent server-side hydration mismatch
//   if (!isMounted) {
//     return null; 
//   }

//   return (
//     <div className="w-full bg-[#070d1e] text-white px-4 py-4 flex flex-col items-center">
//       {/* Title Header */}
//       <div className="text-center mb-4">
//         <h2 className="text-xl font-black font-serif tracking-tight text-white">
//           Select Your <span className="text-[#facc15]">Lucky Tickets</span>
//         </h2>
//         <p className="text-[11px] font-medium text-slate-400 mt-0.5">
//           Tap to select · ₹40 per ticket · Refreshes live every minute
//         </p>
//       </div>

//       {/* Main Glassmorphic Ticket Card */}
//       <div className="w-full max-w-[400px] bg-[#0c1429] border border-[#1d2a4a] rounded-3xl p-4 shadow-2xl">
//         <div className="flex items-center justify-between pb-3 border-b border-[#182440]">
//           <div className="flex items-center gap-2">
//             <TicketIcon className="w-5 h-5 text-[#facc15]" />
//             <span className="font-bold text-sm text-white">
//               Select Tickets (₹40 each)
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <button 
//               onClick={() => regenerateTickets()}
//               title="Refresh tickets"
//               className="p-1 hover:bg-[#182238] text-slate-400 hover:text-[#facc15] rounded-lg transition-colors"
//             >
//               <RefreshCw className="w-3.5 h-3.5" />
//             </button>
//             <span className="bg-[#182238] border border-[#27385c] text-[#facc15] font-bold text-xs py-1 px-3 rounded-full">
//               {selectedTicketIds.length} selected
//             </span>
//           </div>
//         </div>

//         {/* Warning Badge */}
//         <div className="mt-3.5 mb-4 bg-[#182033] border border-[#facc15]/30 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-[#facc15] text-xs font-bold shadow-inner">
//           <AlertTriangle className="w-4 h-4 fill-[#facc15] text-[#0c1429]" />
//           <span>Min. 3 Required</span>
//         </div>

//         {/* Ticket List Container */}
//         <div className="border-2 border-dashed border-[#facc15]/40 rounded-2xl p-2 bg-[#091024]/60">
//           <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
//             {tickets.map((ticket) => {
//               const isSelected = selectedTicketIds.includes(ticket.id);

//               return (
//                 <button
//                   key={ticket.id}
//                   onClick={() => toggleTicket(ticket.id)}
//                   className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
//                     isSelected
//                       ? 'bg-gradient-to-r from-[#1e2e4a] to-[#121c33] border-[#facc15] shadow-[0_0_12px_rgba(250,204,21,0.2)]'
//                       : 'bg-[#0f1930] border-[#1d2b4d] hover:border-[#2a3c6b]'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`w-10 h-6 rounded-full border flex items-center justify-center transition-colors ${
//                         isSelected
//                           ? 'bg-[#facc15] border-[#facc15] text-[#070d1e]'
//                           : 'bg-[#15223d] border-[#2a3c68]'
//                       }`}
//                     >
//                       {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
//                     </div>

//                     <span className="font-mono font-bold text-sm tracking-wider text-white">
//                       {ticket.number}
//                     </span>
//                   </div>

//                   <span className="bg-[#182642] border border-[#283b63] text-[#facc15] font-bold text-xs py-1 px-2.5 rounded-full">
//                     ₹{ticket.price}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useTicketStore } from "@/store/ticket-store";

export function TicketSelection() {
  const { tickets, selectedTicketIds, toggleTicket, selectQuickAmount, clearSelection } =
    useTicketStore();

  const isMinRequirementMet = selectedTicketIds.length >= 3;

  return (
    <div className="w-full max-w-md px-4 mt-6 text-white pb-28">
      {/* Counter Header */}
      <div className="bg-[#042f2e] border border-emerald-800/80 rounded-t-xl p-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-emerald-100 text-sm">
          🎫 Kerala Lottery Counter
        </div>
        <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-800">
          {selectedTicketIds.length} selected
        </span>
      </div>

      {/* Ticket Container Box */}
      <div className="bg-[#121619] border-x border-b border-emerald-900/60 rounded-b-xl p-3 flex flex-col gap-3">
        {/* Min requirement warning alert */}
        {!isMinRequirementMet && (
          <div className="bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1 animate-pulse">
            ⚠️ Minimum 3 Tickets Selection Required
          </div>
        )}

        {/* Quick Select Section */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
            ⚡ QUICK SELECT TICKETS:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15].map((amount) => (
              <button
                key={amount}
                onClick={() => selectQuickAmount(amount)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs transition-colors border border-emerald-600"
              >
                {amount} Tickets
              </button>
            ))}
            <button
              onClick={clearSelection}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Dynamic Scrollable Ticket List */}
        <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-2 border border-dashed border-slate-700/80 rounded-xl p-2 bg-[#0a0c0e]">
          {tickets.map((ticket) => {
            const isSelected = selectedTicketIds.includes(ticket.id);
            return (
              <button
                key={ticket.id}
                onClick={() => toggleTicket(ticket.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                    : "bg-[#181d22] border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border ${
                      isSelected
                        ? "bg-emerald-500 border-emerald-400 text-black font-bold text-xs"
                        : "border-slate-600"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                  <span className="font-mono font-bold tracking-wider text-sm">
                    {ticket.number}
                  </span>
                </div>
                <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded font-semibold">
                  ₹{ticket.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Payment Gateways Footer */}
        <div className="mt-2 text-center flex flex-col items-center gap-2">
          <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            🔒 VERIFIED PAYMENT GATEWAYS
          </p>
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {["GPay", "PhonePe", "Paytm", "UPI / QR"].map((pm) => (
              <span
                key={pm}
                className="text-[10px] font-bold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}