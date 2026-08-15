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

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919006179569";
    const ticketNumbersList = selectedTickets.map((t) => t.number).join(", ");

    const message = `Hello! I would like to book ${count} Kerala Mega Jackpot ticket(s).\n\n🎟️ *Tickets:* ${ticketNumbersList}\n💰 *Total Amount:* ₹${totalAmount}\n\nPlease confirm my booking and provide payment details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-300 p-3.5 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Counter Info */}
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
            {count} {count === 1 ? "Ticket" : "Tickets"} Selected
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#064016] font-serif">
              ₹{totalAmount}
            </span>
            <span className="text-xs font-semibold text-slate-500">total</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleWhatsAppBooking}
          disabled={!isMinMet}
          className={`flex-1 py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
            isMinMet
              ? "bg-[#0b6623] hover:bg-[#064016] active:scale-[0.98] text-white border-b-2 border-[#064016]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
          }`}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          Book on WhatsApp
        </button>
      </div>
    </div>
  );
}