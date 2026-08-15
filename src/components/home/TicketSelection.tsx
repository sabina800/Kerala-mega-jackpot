// "use client";

// import { useEffect, useState } from "react";
// import { useTicketStore } from "@/store/ticket-store";

// export function TicketSelection() {
//   const [isMounted, setIsMounted] = useState(false);
//   const { tickets, selectedTicketIds, toggleTicket, selectQuickAmount, clearSelection } =
//     useTicketStore();

//   // Hydration fix: Mount hone tak wait karo
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const isMinRequirementMet = selectedTicketIds.length >= 3;

//   // Agar abhi tak client component mount nahi hua toh static layout ya loader render karo
//   if (!isMounted) {
//     return (
//       <div className="w-full max-w-md mx-auto px-4 mt-4 text-center text-slate-500">
//         Loading tickets...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md mx-auto px-4 mt-4 text-slate-900 pb-32">
//       {/* Title Header */}
//       <div className="text-center mb-4">
//         <span className="bg-[#f4c430] text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1 shadow-sm">
//           Official Govt. Outlet
//         </span>
//         <h2 className="text-2xl font-black text-[#0b6623] font-serif tracking-tight">
//           Select Tickets For Today's Draw
//         </h2>
//         <p className="text-xs text-slate-600 font-medium mt-1">
//           Draw Date: <span className="font-bold text-slate-800">15 August 2026</span> • Price <span className="font-extrabold text-[#0b6623]">₹40 per ticket</span>
//         </p>
//       </div>

//       {/* Counter Header */}
//       <div className="bg-gradient-to-r from-[#064016] to-[#0b6623] border-b-2 border-[#f4c430] rounded-t-xl p-3.5 flex justify-between items-center text-white shadow-md">
//         <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
//           🎟️ Kerala Lottery Counter
//         </div>
//         <span className="text-xs bg-[#f4c430] text-[#064016] font-black px-3 py-1 rounded-full shadow-sm">
//           {selectedTicketIds.length} selected
//         </span>
//       </div>

//       {/* Main Container */}
//       <div className="bg-white border-x border-b border-slate-300 rounded-b-xl p-4 flex flex-col gap-3 shadow-md">
//         {/* Min Ticket Warning */}
//         {!isMinRequirementMet && (
//           <div className="bg-red-50 border border-red-300 text-red-700 text-xs font-bold py-2.5 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 animate-pulse">
//             <span>⚠️</span> Minimum 3 Tickets Selection Required
//           </div>
//         )}

//         {/* Quick Select Buttons */}
//         <div className="flex flex-col gap-2">
//           <span className="text-xs text-[#064016] font-extrabold flex items-center gap-1 tracking-wide">
//             ⚡ QUICK SELECT TICKETS:
//           </span>
//           <div className="grid grid-cols-4 gap-2">
//             {[5, 10, 15].map((amount) => (
//               <button
//                 key={amount}
//                 onClick={() => selectQuickAmount(amount)}
//                 className="bg-[#0b6623] hover:bg-[#064016] text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
//               >
//                 {amount} Tickets
//               </button>
//             ))}
//             <button
//               onClick={clearSelection}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Ticket List */}
//         <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-2 border border-slate-200 rounded-xl p-2.5 bg-slate-50">
//           {tickets.map((ticket) => {
//             const isSelected = selectedTicketIds.includes(ticket.id);
//             return (
//               <button
//                 key={ticket.id}
//                 onClick={() => toggleTicket(ticket.id)}
//                 className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
//                   isSelected
//                     ? "bg-[#e8f5e9] border-[#0b6623] text-[#064016] font-bold shadow-sm translate-x-1"
//                     : "bg-white border-slate-300 text-slate-800 hover:border-slate-400"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
//                       isSelected
//                         ? "bg-[#0b6623] border-[#0b6623] text-white font-bold text-xs shadow-sm"
//                         : "border-slate-400 bg-white"
//                     }`}
//                   >
//                     {isSelected && "✓"}
//                   </div>
//                   <span className="font-mono font-extrabold tracking-wider text-sm">
//                     {ticket.number}
//                   </span>
//                 </div>
//                 <span className="text-xs bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-1 rounded-full font-black">
//                   ₹{ticket.price}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Payment Gateways Footer */}
//         <div className="mt-2 text-center flex flex-col items-center gap-2">
//           <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
//             🔒 VERIFIED PAYMENT GATEWAYS
//           </p>
//           <div className="flex justify-center items-center gap-1.5 flex-wrap">
//             {["GPay", "PhonePe", "Paytm", "UPI / QR"].map((pm) => (
//               <span
//                 key={pm}
//                 className="text-[10px] font-bold bg-slate-100 border border-slate-300 px-2.5 py-1 rounded text-slate-700"
//               >
//                 {pm}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useTicketStore } from "@/store/ticket-store";

// export function TicketSelection() {
//   const [isMounted, setIsMounted] = useState(false);

//   const {
//     tickets,
//     selectedTicketIds,
//     toggleTicket,
//     selectQuickAmount,
//     clearSelection,
//     ticketPrice,
//     remainingTicketsCount,
//   } = useTicketStore();

//   // Dynamic Remaining Tickets State
//   const [remainingTickets, setRemainingTickets] = useState(remainingTicketsCount);

//   useEffect(() => {
//     setIsMounted(true);

//     // Sync state with admin updates
//     setRemainingTickets(remainingTicketsCount);

//     // Fluctuation/decrease effect
//     const interval = setInterval(() => {
//       setRemainingTickets((prev) => {
//         if (prev <= 12) return 12;
//         const drop = Math.floor(Math.random() * 2) + 1;
//         return prev - drop;
//       });
//     }, Math.floor(Math.random() * 4000) + 3000);

//     return () => clearInterval(interval);
//   }, [remainingTicketsCount]);

//   const isMinRequirementMet = selectedTicketIds.length >= 3;

//   if (!isMounted) {
//     return (
//       <div className="w-full max-w-md mx-auto px-4 mt-4 text-center text-slate-500 font-medium">
//         Loading official counter...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md mx-auto px-4 mt-4 text-slate-900 pb-32">
      
      

//       {/* Title Header */}
//       <div className="text-center mb-4">
//         <span className="bg-[#f4c430] text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1 shadow-sm">
//           Official Govt. Outlet
//         </span>
//         <h2 className="text-2xl font-black text-[#0b6623] font-serif tracking-tight">
//           Select Tickets For Today's Draw
//         </h2>
//         <p className="text-xs text-slate-600 font-medium mt-1">
//           Draw Date: <span className="font-bold text-slate-800">15 August 2026</span> • Price <span className="font-extrabold text-[#0b6623]">₹{ticketPrice} per ticket</span>
//         </p>
//       </div>

//       {/* Counter Header */}
//       <div className="bg-gradient-to-r from-[#064016] to-[#0b6623] border-b-2 border-[#f4c430] rounded-t-xl p-3.5 flex justify-between items-center text-white shadow-md">
//         <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
//           🎟️ Kerala Lottery Counter
//         </div>
//         <span className="text-xs bg-[#f4c430] text-[#064016] font-black px-3 py-1 rounded-full shadow-sm">
//           {selectedTicketIds.length} selected
//         </span>
//       </div>

//       {/* Main Container */}
//       <div className="bg-white border-x border-b border-slate-300 rounded-b-xl p-4 flex flex-col gap-3 shadow-md">
        
//         {/* Min Ticket Warning */}
//         {!isMinRequirementMet && (
//           <div className="bg-red-50 border border-red-300 text-red-700 text-xs font-bold py-2.5 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 animate-pulse">
//             <span>⚠️</span> Minimum 3 Tickets Selection Required
//           </div>
//         )}

//         {/* Quick Select Buttons */}
//         <div className="flex flex-col gap-2">
//           <span className="text-xs text-[#064016] font-extrabold flex items-center gap-1 tracking-wide">
//             ⚡ QUICK SELECT TICKETS:
//           </span>
//           <div className="grid grid-cols-4 gap-2">
//             {[5, 10, 15].map((amount) => (
//               <button
//                 key={amount}
//                 onClick={() => selectQuickAmount(amount)}
//                 className="bg-[#0b6623] hover:bg-[#064016] text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
//               >
//                 {amount} Tickets
//               </button>
//             ))}
//             <button
//               onClick={clearSelection}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Connected Ticket List */}
//         <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-2 border border-slate-200 rounded-xl p-2.5 bg-slate-50">
//           {tickets.map((ticket) => {
//             const isSelected = selectedTicketIds.includes(ticket.id);
//             const isSold = ticket.isSold;

//             return (
//               <button
//                 key={ticket.id}
//                 disabled={isSold}
//                 onClick={() => !isSold && toggleTicket(ticket.id)}
//                 className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
//                   isSold
//                     ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
//                     : isSelected
//                     ? "bg-[#e8f5e9] border-[#0b6623] text-[#064016] font-bold shadow-sm translate-x-1"
//                     : "bg-white border-slate-300 text-slate-800 hover:border-slate-400"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
//                       isSold
//                         ? "bg-slate-300 border-slate-300 text-slate-500 font-bold text-xs"
//                         : isSelected
//                         ? "bg-[#0b6623] border-[#0b6623] text-white font-bold text-xs shadow-sm"
//                         : "border-slate-400 bg-white"
//                     }`}
//                   >
//                     {isSold ? "✕" : isSelected ? "✓" : ""}
//                   </div>
//                   <span className={`font-mono font-extrabold tracking-wider text-sm ${isSold ? "line-through" : ""}`}>
//                     {ticket.number}
//                   </span>
//                 </div>
                
//                 <span
//                   className={`text-xs px-2.5 py-1 rounded-full font-black ${
//                     isSold
//                       ? "bg-red-100 border border-red-300 text-red-700"
//                       : "bg-amber-100 border border-amber-300 text-amber-900"
//                   }`}
//                 >
//                   {isSold ? "SOLD OUT" : `₹${ticket.price || ticketPrice}`}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Payment Gateways Footer */}
//         <div className="mt-2 text-center flex flex-col items-center gap-2">
//           <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
//             🔒 VERIFIED PAYMENT GATEWAYS
//           </p>
//           <div className="flex justify-center items-center gap-1.5 flex-wrap">
//             {["GPay", "PhonePe", "Paytm", "UPI / QR"].map((pm) => (
//               <span
//                 key={pm}
//                 className="text-[10px] font-bold bg-slate-100 border border-slate-300 px-2.5 py-1 rounded text-slate-700"
//               >
//                 {pm}
//               </span>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useTicketStore } from "@/store/ticket-store";

export function TicketSelection() {
  const [isMounted, setIsMounted] = useState(false);

  const {
    tickets,
    selectedTicketIds,
    toggleTicket,
    selectQuickAmount,
    clearSelection,
    ticketPrice,
    remainingTicketsCount,
  } = useTicketStore();

  const [remainingTickets, setRemainingTickets] = useState(remainingTicketsCount);

  useEffect(() => {
    setIsMounted(true);
    setRemainingTickets(remainingTicketsCount);
  }, [remainingTicketsCount]);

  const isMinRequirementMet = selectedTicketIds.length >= 3;

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-2 text-slate-900 pb-32 bg-gray-200 rounded-xl shadow-md">

  {/* Ticket Selection Title */}
  <div className="text-center mb-2">
    <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#1e293b] leading-tight">
      Select Tickets For <span className="text-[#0b6623]">Today's Draw</span>
    </h2>

    <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-0.5">
      Draw Date:{" "}
      <span className="text-[#064016]">15 August 2026</span>
      <span className="mx-1">·</span>
      Price ₹40 per ticket
    </p>
  </div>
      
      

      {/* Counter Header */}
      <div className="bg-gradient-to-r from-[#064016] to-[#0b6623] border-b-2 border-[#f4c430] rounded-t-xl p-3.5 flex justify-between items-center text-white shadow-md">
        <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
          🎟️ Kerala Lottery Counter
        </div>
        <span className="text-xs bg-[#f4c430] text-[#064016] font-black px-3 py-1 rounded-full shadow-sm">
          {selectedTicketIds.length} selected
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white border-x border-b border-slate-300 rounded-b-xl p-4 flex flex-col gap-3 shadow-md">
        {!isMinRequirementMet && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-xs font-bold py-2.5 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 animate-pulse">
            <span>⚠️</span> Minimum 3 Tickets Selection Required
          </div>
        )}

        {/* Quick Select Buttons */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-[#064016] font-extrabold flex items-center gap-1 tracking-wide">
            ⚡ QUICK SELECT TICKETS:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15].map((amount) => (
              <button
                key={amount}
                onClick={() => selectQuickAmount(amount)}
                className="bg-[#0b6623] hover:bg-[#064016] text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
              >
                {amount} Tickets
              </button>
            ))}
            <button
              onClick={clearSelection}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm active:scale-95"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Scrollable Ticket List */}
        <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-2 border border-slate-200 rounded-xl p-2.5 bg-slate-50">
          {tickets.map((ticket) => {
            const isSelected = selectedTicketIds.includes(ticket.id);
            const isSold = ticket.isSold;

            return (
              <button
                key={ticket.id}
                disabled={isSold}
                onClick={() => !isSold && toggleTicket(ticket.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isSold
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                    : isSelected
                    ? "bg-[#e8f5e9] border-[#0b6623] text-[#064016] font-bold shadow-sm translate-x-1"
                    : "bg-white border-slate-300 text-slate-800 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      isSold
                        ? "bg-slate-300 border-slate-300 text-slate-500 font-bold text-xs"
                        : isSelected
                        ? "bg-[#0b6623] border-[#0b6623] text-white font-bold text-xs shadow-sm"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {isSold ? "✕" : isSelected ? "✓" : ""}
                  </div>
                  <span className={`font-mono font-extrabold tracking-wider text-sm ${isSold ? "line-through" : ""}`}>
                    {ticket.number}
                  </span>
                </div>
                
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-black ${
                    isSold
                      ? "bg-red-100 border border-red-300 text-red-700"
                      : "bg-amber-100 border border-amber-300 text-amber-900"
                  }`}
                >
                  {isSold ? "SOLD OUT" : `₹${ticket.price || ticketPrice}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Payment Gateways Footer */}
        <div className="mt-2 text-center flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            🔒 VERIFIED PAYMENT GATEWAYS
          </p>
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {["GPay", "PhonePe", "Paytm", "UPI / QR"].map((pm) => (
              <span
                key={pm}
                className="text-[10px] font-bold bg-slate-100 border border-slate-300 px-2.5 py-1 rounded text-slate-700"
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