


// 'use client';

// import React, { useState } from 'react';
// import { useTicketStore } from '@/store/ticket-store';
// import { MessageCircle, Mail, Loader2 } from 'lucide-react';

// export default function BookingBar() {
//   const { tickets, selectedTicketIds } = useTicketStore();
//   const [loading, setLoading] = useState(false);

//   const selectedCount = selectedTicketIds.length;
//   const pricePerTicket = 40;
//   const totalPrice = selectedCount * pricePerTicket;

//   const selectedTicketNumbers = tickets
//     .filter((t) => selectedTicketIds.includes(t.id))
//     .map((t) => t.number);

//   // Send Direct Email via API
//   const handleEmailBooking = async () => {
//     if (selectedCount < 3) {
//       alert('Please select at least 3 tickets to proceed.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           tickets: selectedTicketNumbers,
//           totalAmount: totalPrice,
//           totalCount: selectedCount,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('🎉 Booking details sent to Admin via Email!');
//       } else {
//         alert('Failed to send email. Please try WhatsApp booking instead.');
//       }
//     } catch (err) {
//       alert('Error connecting to server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWhatsAppBooking = () => {
//     const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919006179569';
    
//     if (selectedCount < 3) {
//       alert('Please select at least 3 tickets to proceed.');
//       return;
//     }

//     const message = `Hello! I want to book ${selectedCount} ticket(s): ${selectedTicketNumbers.join(
//       ', '
//     )}. Total Amount: ₹${totalPrice}.`;

//     window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   return (
//     <>
//       {/* Floating WhatsApp Button */}
//       <div className="fixed bottom-20 right-4 z-40">
//         <button
//           onClick={handleWhatsAppBooking}
//           className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
//         >
//           <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
//           <MessageCircle className="w-7 h-7 fill-current stroke-none relative z-10" />
//         </button>
//       </div>

//       {/* Sticky Bottom Booking Bar */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[#070d1e]/90 backdrop-blur-md border-t border-[#1a284a] px-4 py-3">
//         <div className="w-full max-w-[412px] flex items-center justify-between gap-2">
//           {/* Price Display */}
//           <div className="flex flex-col text-left shrink-0">
//             <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
//               {selectedCount} SELECTED
//             </span>
//             <div className="flex items-baseline gap-1">
//               <span className="text-2xl font-black text-[#facc15] leading-none font-serif">
//                 ₹{totalPrice}
//               </span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center gap-2 flex-1 justify-end">
//             {/* Email Button */}
//             {/* Action Buttons *<button
//               onClick={handleEmailBooking}
//               disabled={loading}
//               className="bg-[#182542] hover:bg-[#203157] border border-[#2d416d] text-slate-100 font-bold text-xs py-3 px-3 rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
//             >
//               {loading ? (
//                 <Loader2 className="w-4 h-4 animate-spin text-[#facc15]" />
//               ) : (
//                 <Mail className="w-4 h-4 text-[#facc15]" />
//               )}
//               <span>Email</span>
//             </button>*/}

//             {/* WhatsApp Button */}
//             <button
//               onClick={handleWhatsAppBooking}
//               className="bg-[#25d366] hover:bg-[#22c55e] text-slate-950 font-bold text-xs py-3 px-3 rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
//             >
//               <MessageCircle className="w-4 h-4 fill-current stroke-none" />
//               <span>WhatsApp</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import { useTicketStore } from "@/store/ticket-store";

export function BookingBar() {
  const { tickets, selectedTicketIds } = useTicketStore();

  const selectedTickets = tickets.filter((t) =>
    selectedTicketIds.includes(t.id)
  );

  const totalAmount = selectedTickets.reduce((sum, t) => sum + t.price, 0);
  const count = selectedTickets.length;
  const isMinMet = count >= 3;

  const handleWhatsAppBooking = () => {
    if (!isMinMet) return;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
    const ticketNumbersList = selectedTickets.map((t) => t.number).join(", ");

    const message = `Hello! I would like to book ${count} Kerala Mega Jackpot ticket(s).\n\n🎟️ *Tickets:* ${ticketNumbersList}\n💰 *Total Amount:* ₹${totalAmount}\n\nPlease confirm my booking and provide payment details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1115]/95 backdrop-blur-md border-t border-emerald-900/50 p-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Selected Count & Total Price */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            {count} {count === 1 ? "Ticket" : "Tickets"} Selected
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-white font-serif">
              ₹{totalAmount}
            </span>
            <span className="text-xs text-slate-400">total</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleWhatsAppBooking}
          disabled={!isMinMet}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            isMinMet
              ? "bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white shadow-emerald-900/30"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          {/* WhatsApp Icon SVG */}
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          {isMinMet ? "Book on WhatsApp" : "Select Min 3 Tickets"}
        </button>
      </div>
    </div>
  );
}