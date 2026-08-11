// 'use client';

// import React from 'react';
// import { useTicketStore } from '@/store/ticket-store';
// import { MessageCircle } from 'lucide-react';

// export default function BookingBar() {
//   const { selectedTicketIds } = useTicketStore();

//   const selectedCount = selectedTicketIds.length;
//   const pricePerTicket = 40;
//   const totalPrice = selectedCount * pricePerTicket;

//   const handleWhatsAppBooking = () => {
//     const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917856961967';
    
//     let message = `Hello! I want to book ${selectedCount} Kerala Lottery ticket(s). Total Amount: ₹${totalPrice}.`;
    
//     if (selectedCount < 3) {
//       alert('Please select at least 3 tickets to proceed.');
//       return;
//     }

//     const encodedMessage = encodeURIComponent(message);
//     window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
//   };

//   return (
//     <>
//       {/* Floating Action Button (WhatsApp Icon with Glowing Ripple) */}
//       <div className="fixed bottom-20 right-4 z-40">
//         <button
//           onClick={handleWhatsAppBooking}
//           aria-label="Contact WhatsApp"
//           className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-[0_4px_25px_rgba(37,211,102,0.5)] border-2 border-white/20 active:scale-95 transition-transform"
//         >
//           <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
//           <MessageCircle className="w-7 h-7 fill-current stroke-none relative z-10" />
//         </button>
//       </div>

//       {/* Sticky Bottom Booking Bar Container */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[#070d1e]/90 backdrop-blur-md border-t border-[#1a284a] px-4 py-3">
//         <div className="w-full max-w-[412px] flex items-center justify-between gap-3">
//           {/* Selected Count & Total Price Display */}
//           <div className="flex flex-col text-left">
//             <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
//               {selectedCount} TICKETS SELECTED
//             </span>
//             <div className="flex items-baseline gap-1">
//               <span className="text-2xl font-black text-[#facc15] leading-none font-serif">
//                 ₹{totalPrice}
//               </span>
//               <span className="text-[10px] font-semibold text-slate-400">
//                 total
//               </span>
//             </div>
//           </div>

//           {/* Book on WhatsApp Main Button */}
//           <button
//             onClick={handleWhatsAppBooking}
//             className="flex-1 bg-gradient-to-r from-[#182542] to-[#101b33] hover:from-[#203157] hover:to-[#172647] border border-[#2d416d] text-slate-100 font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
//           >
//             <MessageCircle className="w-4 h-4 text-[#25d366] fill-[#25d366]/20" />
//             <span>Book on WhatsApp</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


'use client';

import React, { useState } from 'react';
import { useTicketStore } from '@/store/ticket-store';
import { MessageCircle, Mail, Loader2 } from 'lucide-react';

export default function BookingBar() {
  const { tickets, selectedTicketIds } = useTicketStore();
  const [loading, setLoading] = useState(false);

  const selectedCount = selectedTicketIds.length;
  const pricePerTicket = 40;
  const totalPrice = selectedCount * pricePerTicket;

  const selectedTicketNumbers = tickets
    .filter((t) => selectedTicketIds.includes(t.id))
    .map((t) => t.number);

  // Send Direct Email via API
  const handleEmailBooking = async () => {
    if (selectedCount < 3) {
      alert('Please select at least 3 tickets to proceed.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tickets: selectedTicketNumbers,
          totalAmount: totalPrice,
          totalCount: selectedCount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('🎉 Booking details sent to Admin via Email!');
      } else {
        alert('Failed to send email. Please try WhatsApp booking instead.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919006179569';
    
    if (selectedCount < 3) {
      alert('Please select at least 3 tickets to proceed.');
      return;
    }

    const message = `Hello! I want to book ${selectedCount} ticket(s): ${selectedTicketNumbers.join(
      ', '
    )}. Total Amount: ₹${totalPrice}.`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={handleWhatsAppBooking}
          className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
          <MessageCircle className="w-7 h-7 fill-current stroke-none relative z-10" />
        </button>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[#070d1e]/90 backdrop-blur-md border-t border-[#1a284a] px-4 py-3">
        <div className="w-full max-w-[412px] flex items-center justify-between gap-2">
          {/* Price Display */}
          <div className="flex flex-col text-left shrink-0">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              {selectedCount} SELECTED
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#facc15] leading-none font-serif">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            {/* Email Button */}
            {/* Action Buttons *<button
              onClick={handleEmailBooking}
              disabled={loading}
              className="bg-[#182542] hover:bg-[#203157] border border-[#2d416d] text-slate-100 font-bold text-xs py-3 px-3 rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#facc15]" />
              ) : (
                <Mail className="w-4 h-4 text-[#facc15]" />
              )}
              <span>Email</span>
            </button>*/}

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppBooking}
              className="bg-[#25d366] hover:bg-[#22c55e] text-slate-950 font-bold text-xs py-3 px-3 rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current stroke-none" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}