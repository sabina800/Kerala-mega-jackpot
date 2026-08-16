"use client";

import { create } from "zustand";
import { Ticket } from "@/types/tickets";

export interface ExtendedTicket extends Ticket {
  isSold?: boolean;
}

interface TicketStore {
  tickets: ExtendedTicket[];
  selectedTicketIds: string[];

  // Admin Config State
  ticketPrice: number;
  drawDate: string;
  bumperPrize: string;
  lotterySubtitle: string;
  whatsappNumber: string;
  upiId: string;
  remainingTicketsCount: number;
  announcementBanner: string;

  // Actions
  fetchData: () => Promise<void>;
  updateAdminConfig: (config: Partial<{
    ticketPrice: number;
    drawDate: string;
    bumperPrize: string;
    lotterySubtitle: string;
    whatsappNumber: string;
    upiId: string;
    remainingTicketsCount: number;
    announcementBanner: string;
  }>) => Promise<void>;
  toggleTicket: (id: string) => void;
  toggleSoldStatus: (id: string) => void;
  addCustomTicket: (number: string) => void;
  selectQuickAmount: (count: number) => void;
  clearSelection: () => void;
  regenerateTickets: () => void;
  resetSystemState: () => void;
  resetSpecificTickets: (ticketIds: string[]) => void;
}

// Initial Local Tickets Generator
const generateInitialTickets = (count = 250): ExtendedTicket[] => {
  const tickets: ExtendedTicket[] = [];
  for (let i = 1; i <= count; i++) {
    const paddedNumber = String(100000 + (i * 137) % 899999).padStart(6, "0");
    tickets.push({
      id: i.toString(),
      number: `KL${paddedNumber}`,
      price: 40,
      isSold: false,
    });
  }
  return tickets;
};

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: generateInitialTickets(250),
  selectedTicketIds: [],

  // Default Fallback Admin Controls
  ticketPrice: 40,
  drawDate: "15 August 2026",
  bumperPrize: "Bumper Prize ₹25 Crore",
  lotterySubtitle: "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
  whatsappNumber: "919000000000",
  upiId: "keralalottery@upi",
  remainingTicketsCount: 76,
  announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",

  // 🔄 Fetch Fresh Data from Free Database API
  fetchData: async () => {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (res.ok) {
        const config = await res.json();
        set({
          whatsappNumber: config.whatsappNumber ?? "919000000000",
          drawDate: config.drawDate ?? "",
          ticketPrice: Number(config.ticketPrice ?? 40),
          bumperPrize: config.bumperPrize ?? "",
          lotterySubtitle: config.lotterySubtitle ?? "",
          upiId: config.upiId ?? "",
          remainingTicketsCount: Number(config.remainingTicketsCount ?? 76),
          announcementBanner: config.announcementBanner ?? "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch store data from API:", error);
    }
  },

  // 📝 Update Admin Settings to Free Database (Syncs All Devices)
  updateAdminConfig: async (newConfig) => {
    try {
      // Optimistic UI Update for current user
      set((state) => ({ ...state, ...newConfig }));

      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });

      if (res.ok) {
        await get().fetchData();
      }
    } catch (error) {
      console.error("Failed to save config to API:", error);
    }
  },

  toggleTicket: (id) =>
    set((state) => {
      const isSelected = state.selectedTicketIds.includes(id);
      return {
        selectedTicketIds: isSelected
          ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
          : [...state.selectedTicketIds, id],
      };
    }),

  toggleSoldStatus: (id) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, isSold: !t.isSold } : t
      ),
    })),

  addCustomTicket: (number) =>
    set((state) => ({
      tickets: [
        {
          id: `${Date.now()}`,
          number: number.toUpperCase(),
          price: state.ticketPrice,
          isSold: false,
        },
        ...state.tickets,
      ],
    })),

  selectQuickAmount: (count: number) =>
    set((state) => {
      const availableTickets = state.tickets.filter((t) => !t.isSold);
      const firstNIds = availableTickets.slice(0, count).map((t) => t.id);
      return { selectedTicketIds: firstNIds };
    }),

  clearSelection: () => set({ selectedTicketIds: [] }),

  resetSpecificTickets: (ticketIds: string[]) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        ticketIds.includes(t.id) ? { ...t, isSold: false } : t
      ),
    })),

  regenerateTickets: () =>
    set(() => {
      const freshTickets: ExtendedTicket[] = [];
      for (let i = 1; i <= 250; i++) {
        const random6Digits = Math.floor(100000 + Math.random() * 900000);
        freshTickets.push({
          id: `${i}-${Date.now()}`,
          number: `KL${random6Digits}`,
          price: 40,
          isSold: false,
        });
      }
      return {
        tickets: freshTickets,
        selectedTicketIds: [],
      };
    }),

  resetSystemState: () =>
    set(() => {
      const freshTickets: ExtendedTicket[] = [];
      for (let i = 1; i <= 250; i++) {
        const random6Digits = Math.floor(100000 + Math.random() * 900000);
        freshTickets.push({
          id: i.toString(),
          number: `KL${random6Digits}`,
          price: 40,
          isSold: false,
        });
      }
      return {
        tickets: freshTickets,
        selectedTicketIds: [],
        remainingTicketsCount: 250,
      };
    }),
}));