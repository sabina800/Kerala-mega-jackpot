"use client";

import { useState } from "react";
import { useTicketStore } from "@/store/ticket-store";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const {
    ticketPrice,
    drawDate,
    bumperPrize,
    lotterySubtitle,
    whatsappNumber,
    upiId,
    remainingTicketsCount,
    announcementBanner,
    updateAdminConfig,
    resetSystemState,
    resetSpecificTickets,
    tickets,
    toggleSoldStatus,
    addCustomTicket,
  } = useTicketStore();

  const [formState, setFormState] = useState({
    ticketPrice,
    drawDate,
    bumperPrize: bumperPrize || "Bumper Prize ₹25 Crore",
    lotterySubtitle: lotterySubtitle || "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
    whatsappNumber,
    upiId,
    remainingTicketsCount,
    announcementBanner,
  });

  const [newTicketNum, setNewTicketNum] = useState("");
  const [resetTargetNum, setResetTargetNum] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "tickets">("settings");

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminConfig({
      ticketPrice: Number(formState.ticketPrice),
      drawDate: formState.drawDate,
      bumperPrize: formState.bumperPrize,
      lotterySubtitle: formState.lotterySubtitle,
      whatsappNumber: formState.whatsappNumber,
      upiId: formState.upiId,
      remainingTicketsCount: Number(formState.remainingTicketsCount),
      announcementBanner: formState.announcementBanner,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicketNum.trim()) {
      addCustomTicket(newTicketNum.trim());
      setNewTicketNum("");
    }
  };

  const handleResetSingleTicket = (ticketId: string, ticketNumber: string) => {
    const isConfirmed = window.confirm(
      `⚠️ RESET SPECIFIC TICKET?\n\nAre you sure you want to reset status for ticket: ${ticketNumber}?`
    );
    if (isConfirmed) {
      resetSpecificTickets([ticketId]);
      alert(`✅ Ticket ${ticketNumber} has been successfully reset to available!`);
    }
  };

  const handleSpecificResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = resetTargetNum.trim().toUpperCase();
    if (!query) return;

    const matchedTicket = tickets.find(
      (t) => t.number.toUpperCase() === query || t.number.toUpperCase() === `KL${query}`
    );

    if (!matchedTicket) {
      alert(`❌ Ticket "${query}" not found in current inventory.`);
      return;
    }

    handleResetSingleTicket(matchedTicket.id, matchedTicket.number);
    setResetTargetNum("");
  };

  const handleResetAllSoldTickets = () => {
    const soldIds = tickets.filter((t) => t.isSold).map((t) => t.id);
    if (soldIds.length === 0) {
      alert("ℹ️ No sold tickets found to reset.");
      return;
    }

    const isConfirmed = window.confirm(
      `⚠️ RESET ALL ${soldIds.length} SOLD TICKETS?`
    );

    if (isConfirmed) {
      resetSpecificTickets(soldIds);
      alert(`✅ All ${soldIds.length} sold tickets have been reset to active!`);
    }
  };

  const handleFullResetWithAlert = () => {
    const isConfirmed = window.confirm(
      "⚠️ WARNING: ARE YOU SURE YOU WANT TO RESET EVERYTHING?"
    );

    if (isConfirmed) {
      resetSystemState();
      alert("✅ Complete system reset successful!");
    }
  };

  const exportToCSV = () => {
    const headers = "ID,Ticket Number,Price,Status\n";
    const rows = tickets
      .map((t) => `${t.id},${t.number},${t.price},${t.isSold ? "Sold" : "Available"}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kerala-lottery-tickets-${Date.now()}.csv`;
    a.click();
  };

  const filteredTickets = tickets.filter((t) =>
    t.number.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const soldTicketsCount = tickets.filter((t) => t.isSold).length;
  const availableTicketsCount = tickets.length - soldTicketsCount;
  const estimatedRevenue = soldTicketsCount * ticketPrice;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl text-center">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-xl font-bold font-serif">Admin Security Guard</h1>
          <p className="text-xs text-slate-400 mt-1 mb-6">Enter secret 4-digit PIN to access dashboard</p>
          
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-slate-900 border border-slate-600 rounded-xl py-3 text-white focus:outline-[#0b6623]"
              required
            />
            {pinError && <p className="text-xs font-bold text-red-400">❌ Incorrect Security PIN!</p>}
            <button
              type="submit"
              className="w-full bg-[#0b6623] hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#064016] to-[#0b6623] text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-[#f4c430]">
          <div>
            <span className="bg-[#f4c430] text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
              Control Center Pro
            </span>
            <h1 className="text-2xl font-black font-serif mt-1">Kerala Lottery Admin Panel</h1>
            <p className="text-xs text-slate-200">Manage pricing, sold tickets, hero dates & banners in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-3 py-2 rounded-xl text-xs shadow-sm"
            >
              📥 Export CSV
            </button>
            <a
              href="/"
              target="_blank"
              className="bg-white text-[#064016] font-bold px-3 py-2 rounded-xl text-xs hover:bg-slate-100 shadow-sm"
            >
              🌐 Live Site
            </a>
          </div>
        </div>

        {/* Live Analytics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase">Total Inventory</span>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{tickets.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-emerald-600 font-extrabold uppercase">Available Tickets</span>
            <p className="text-2xl font-black text-[#0b6623] mt-0.5">{availableTicketsCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-red-500 font-extrabold uppercase">Sold Tickets</span>
            <p className="text-2xl font-black text-red-600 mt-0.5">{soldTicketsCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-amber-600 font-extrabold uppercase">Est. Revenue</span>
            <p className="text-2xl font-black text-amber-700 mt-0.5">₹{estimatedRevenue}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 gap-4">
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2.5 text-sm font-bold border-b-2 transition-all ${
              activeTab === "settings"
                ? "border-[#0b6623] text-[#0b6623]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            ⚙️ Hero & General Settings
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`pb-2.5 text-sm font-bold border-b-2 transition-all ${
              activeTab === "tickets"
                ? "border-[#0b6623] text-[#0b6623]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            🎟️ Manage Tickets ({tickets.length})
          </button>
        </div>

        {/* TAB 1: HERO & GENERAL SETTINGS FORM */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {isSaved && (
              <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
                ✅ Hero section & system settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
  <label className="block text-xs font-bold text-slate-700 mb-1">
    📅 Official Draw Date Text <span className="text-slate-400 font-normal">(Leave blank to hide date from Hero)</span>
  </label>
  <input
    type="text"
    placeholder="e.g. 15 August 2026 or leave empty to remove"
    value={formState.drawDate}
    onChange={(e) => setFormState({ ...formState, drawDate: e.target.value })}
    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
  />
</div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">🏆 Bumper Prize Badge Text</label>
                  <input
                    type="text"
                    value={formState.bumperPrize}
                    onChange={(e) => setFormState({ ...formState, bumperPrize: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">📜 Header Subtitle Text</label>
                  <input
                    type="text"
                    value={formState.lotterySubtitle}
                    onChange={(e) => setFormState({ ...formState, lotterySubtitle: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={formState.ticketPrice}
                    onChange={(e) => setFormState({ ...formState, ticketPrice: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scarcity Ticker (Tickets Left)</label>
                  <input
                    type="number"
                    value={formState.remainingTicketsCount}
                    onChange={(e) => setFormState({ ...formState, remainingTicketsCount: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Recipient Number</label>
                  <input
                    type="text"
                    value={formState.whatsappNumber}
                    onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">UPI VPA Address</label>
                  <input
                    type="text"
                    value={formState.upiId}
                    onChange={(e) => setFormState({ ...formState, upiId: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urgency Banner Text</label>
                  <input
                    type="text"
                    value={formState.announcementBanner}
                    onChange={(e) => setFormState({ ...formState, announcementBanner: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-semibold focus:outline-none focus:border-[#0b6623]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-[#0b6623] hover:bg-[#064016] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={handleFullResetWithAlert}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  🚨 Reset Everything
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: TICKET INVENTORY & SPECIFIC RESET CONTROL */}
        {activeTab === "tickets" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                  ⚡ Specific Ticket Quick Reset
                </h3>
                <p className="text-[11px] text-amber-800">Enter ticket number to quickly make it available again</p>
              </div>
              
              <form onSubmit={handleSpecificResetSubmit} className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="e.g. KL123456"
                  value={resetTargetNum}
                  onChange={(e) => setResetTargetNum(e.target.value)}
                  className="bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-600 w-full md:w-44"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs transition-colors whitespace-nowrap active:scale-95"
                >
                  Reset Ticket
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 border-b">
              <form onSubmit={handleAddTicket} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter serial number (e.g. KL998877)"
                  value={newTicketNum}
                  onChange={(e) => setNewTicketNum(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-none focus:border-[#0b6623]"
                />
                <button
                  type="submit"
                  className="bg-[#0b6623] text-white font-bold px-4 py-2.5 rounded-xl text-xs whitespace-nowrap"
                >
                  + Add Ticket
                </button>
              </form>

              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search by ticket number (e.g. 5432)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-none focus:border-[#0b6623] bg-slate-50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-semibold px-1">
              <span>Showing {filteredTickets.length} of {tickets.length} tickets</span>
              <button
                type="button"
                onClick={handleResetAllSoldTickets}
                className="text-red-700 hover:text-red-800 font-extrabold bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-lg transition-all text-[11px] self-start sm:self-auto"
              >
                🔄 Reset All Sold Tickets ({soldTicketsCount})
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-1">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-bold text-sm">
                  🔍 No ticket matches your search query.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredTickets.map((t) => (
                    <div
                      key={t.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        t.isSold
                          ? "bg-red-50 border-red-300 text-red-800"
                          : "bg-slate-50 border-slate-300 text-slate-800"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold block">{t.number}</span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {t.isSold ? "❌ Sold Out" : "✅ Available"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {t.isSold && (
                          <button
                            title="Reset this specific ticket to active"
                            onClick={() => handleResetSingleTicket(t.id, t.number)}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-2 py-1 rounded-lg text-[10px] transition-all active:scale-95"
                          >
                            Reset
                          </button>
                        )}
                        <button
                          onClick={() => toggleSoldStatus(t.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all active:scale-95 ${
                            t.isSold
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {t.isSold ? "Mark Active" : "Mark Sold"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}