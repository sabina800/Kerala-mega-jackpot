


// "use client";

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { Ticket } from "@/types/tickets";

// export interface ExtendedTicket extends Ticket {
//   isSold?: boolean;
// }

// interface TicketStore {
//   tickets: ExtendedTicket[];
//   selectedTicketIds: string[];
  
//   // Admin Config State
//   ticketPrice: number;
//   drawDate: string;           // 👈 Can be string or empty "" to hide from UI
//   bumperPrize: string;
//   lotterySubtitle: string;
//   whatsappNumber: string;
//   upiId: string;
//   remainingTicketsCount: number;
//   announcementBanner: string;
  
//   // Actions
//   toggleTicket: (id: string) => void;
//   toggleSoldStatus: (id: string) => void;
//   addCustomTicket: (number: string) => void;
//   selectQuickAmount: (count: number) => void;
//   clearSelection: () => void;
//   regenerateTickets: () => void;
//   resetSystemState: () => void;
//   resetSpecificTickets: (ticketIds: string[]) => void;
//   updateAdminConfig: (config: Partial<{
//     ticketPrice: number;
//     drawDate: string;
//     bumperPrize: string;
//     lotterySubtitle: string;
//     whatsappNumber: string;
//     upiId: string;
//     remainingTicketsCount: number;
//     announcementBanner: string;
//   }>) => void;
// }

// const generateInitialTickets = (count = 250): ExtendedTicket[] => {
//   const tickets: ExtendedTicket[] = [];
//   for (let i = 1; i <= count; i++) {
//     const paddedNumber = String(100000 + (i * 137) % 899999).padStart(6, "0");
//     tickets.push({
//       id: i.toString(),
//       number: `KL${paddedNumber}`,
//       price: 40,
//       isSold: false,
//     });
//   }
//   return tickets;
// };

// export const useTicketStore = create<TicketStore>()(
//   persist(
//     (set) => ({
//       tickets: generateInitialTickets(250),
//       selectedTicketIds: [],
      
//       // Default Admin Controls
//       ticketPrice: 40,
//       drawDate: "15 August 2026", // Clean fallback default
//       bumperPrize: "Bumper Prize ₹25 Crore",
//       lotterySubtitle: "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
//       whatsappNumber: "919000000000",
//       upiId: "keralalottery@upi",
//       remainingTicketsCount: 76,
//       announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",

//       toggleTicket: (id) =>
//         set((state) => {
//           const isSelected = state.selectedTicketIds.includes(id);
//           return {
//             selectedTicketIds: isSelected
//               ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
//               : [...state.selectedTicketIds, id],
//           };
//         }),

//       toggleSoldStatus: (id) =>
//         set((state) => ({
//           tickets: state.tickets.map((t) =>
//             t.id === id ? { ...t, isSold: !t.isSold } : t
//           ),
//         })),

//       addCustomTicket: (number) =>
//         set((state) => ({
//           tickets: [
//             {
//               id: `${Date.now()}`,
//               number: number.toUpperCase(),
//               price: state.ticketPrice,
//               isSold: false,
//             },
//             ...state.tickets,
//           ],
//         })),

//       selectQuickAmount: (count: number) =>
//         set((state) => {
//           const availableTickets = state.tickets.filter((t) => !t.isSold);
//           const firstNIds = availableTickets.slice(0, count).map((t) => t.id);
//           return { selectedTicketIds: firstNIds };
//         }),

//       clearSelection: () => set({ selectedTicketIds: [] }),

//       resetSpecificTickets: (ticketIds: string[]) =>
//         set((state) => ({
//           tickets: state.tickets.map((t) =>
//             ticketIds.includes(t.id) ? { ...t, isSold: false } : t
//           ),
//         })),

//       regenerateTickets: () =>
//         set(() => {
//           const freshTickets: ExtendedTicket[] = [];
//           for (let i = 1; i <= 250; i++) {
//             const random6Digits = Math.floor(100000 + Math.random() * 900000);
//             freshTickets.push({
//               id: `${i}-${Date.now()}`,
//               number: `KL${random6Digits}`,
//               price: 40,
//               isSold: false,
//             });
//           }
//           return {
//             tickets: freshTickets,
//             selectedTicketIds: [],
//           };
//         }),

//       resetSystemState: () =>
//         set(() => {
//           const freshTickets: ExtendedTicket[] = [];
//           for (let i = 1; i <= 250; i++) {
//             const random6Digits = Math.floor(100000 + Math.random() * 900000);
//             freshTickets.push({
//               id: i.toString(),
//               number: `KL${random6Digits}`,
//               price: 40,
//               isSold: false,
//             });
//           }
//           return {
//             tickets: freshTickets,
//             selectedTicketIds: [],
//             remainingTicketsCount: 250,
//           };
//         }),

//       updateAdminConfig: (config) =>
//         set((state) => ({
//           ...state,
//           ...config,
//         })),
//     }),
//     {
//       name: "kerala-lottery-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );





"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase";
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
  
  // Realtime Database & Local Actions
  fetchData: () => Promise<void>;
  toggleTicket: (id: string) => void;
  toggleSoldStatus: (id: string) => Promise<void>;
  addCustomTicket: (number: string) => Promise<void>;
  selectQuickAmount: (count: number) => void;
  clearSelection: () => void;
  regenerateTickets: () => Promise<void>;
  resetSystemState: () => Promise<void>;
  resetSpecificTickets: (ticketIds: string[]) => Promise<void>;
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
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  selectedTicketIds: [],
  
  // Default State Fallbacks
  ticketPrice: 40,
  drawDate: "15 August 2026",
  bumperPrize: "Bumper Prize ₹25 Crore",
  lotterySubtitle: "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
  whatsappNumber: "919000000000",
  upiId: "keralalottery@upi",
  remainingTicketsCount: 76,
  announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",

  // 🔄 Fetch Data Realtime from Supabase
  fetchData: async () => {
    try {
      // 1. Fetch Configuration
      const { data: config } = await supabase
        .from("site_config")
        .select("*")
        .eq("id", 1)
        .single();

      if (config) {
        set({
          whatsappNumber: config.whatsapp_number ?? "919000000000",
          drawDate: config.draw_date ?? "",
          ticketPrice: Number(config.ticket_price ?? 40),
          bumperPrize: config.bumper_prize ?? "",
          lotterySubtitle: config.lottery_subtitle ?? "",
          upiId: config.upi_id ?? "",
          remainingTicketsCount: Number(config.remaining_tickets ?? 76),
          announcementBanner: config.announcement_banner ?? "",
        });
      }

      // 2. Fetch Tickets List
      const { data: ticketsData } = await supabase
        .from("tickets")
        .select("*")
        .order("id", { ascending: true });

      if (ticketsData) {
        set({
          tickets: ticketsData.map((t) => ({
            id: String(t.id),
            number: t.number,
            price: Number(t.price),
            isSold: Boolean(t.is_sold),
          })),
        });
      }
    } catch (error) {
      console.error("Failed to fetch store data from database:", error);
    }
  },

  // 🎟️ Local Selection Toggle
  toggleTicket: (id) =>
    set((state) => {
      const isSelected = state.selectedTicketIds.includes(id);
      return {
        selectedTicketIds: isSelected
          ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
          : [...state.selectedTicketIds, id],
      };
    }),

  // 🔴 Update Ticket Sold Status in Supabase
  toggleSoldStatus: async (id) => {
    const ticket = get().tickets.find((t) => t.id === id);
    if (!ticket) return;

    const newStatus = !ticket.isSold;
    
    // Optimistic UI Update
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, isSold: newStatus } : t
      ),
    }));

    await supabase
      .from("tickets")
      .update({ is_sold: newStatus })
      .eq("id", id);
  },

  // ➕ Add Custom Ticket to Database
  addCustomTicket: async (number) => {
    const newTicket = {
      id: `${Date.now()}`,
      number: number.toUpperCase(),
      price: get().ticketPrice,
      is_sold: false,
    };

    await supabase.from("tickets").insert([newTicket]);
    await get().fetchData();
  },

  selectQuickAmount: (count: number) =>
    set((state) => {
      const availableTickets = state.tickets.filter((t) => !t.isSold);
      const firstNIds = availableTickets.slice(0, count).map((t) => t.id);
      return { selectedTicketIds: firstNIds };
    }),

  clearSelection: () => set({ selectedTicketIds: [] }),

  // 🔄 Mark Specific Tickets Available
  resetSpecificTickets: async (ticketIds: string[]) => {
    await supabase
      .from("tickets")
      .update({ is_sold: false })
      .in("id", ticketIds);

    await get().fetchData();
  },

  // 🎲 Bulk Generate Fresh Tickets in Database
  regenerateTickets: async () => {
    await supabase.from("tickets").delete().neq("id", "0");

    const freshTickets = [];
    for (let i = 1; i <= 250; i++) {
      const random6Digits = Math.floor(100000 + Math.random() * 900000);
      freshTickets.push({
        id: `${i}-${Date.now()}`,
        number: `KL${random6Digits}`,
        price: get().ticketPrice,
        is_sold: false,
      });
    }

    await supabase.from("tickets").insert(freshTickets);
    set({ selectedTicketIds: [] });
    await get().fetchData();
  },

  // ⚙️ Reset Entire Database System
  resetSystemState: async () => {
    await supabase.from("tickets").delete().neq("id", "0");

    const freshTickets = [];
    for (let i = 1; i <= 250; i++) {
      const random6Digits = Math.floor(100000 + Math.random() * 900000);
      freshTickets.push({
        id: i.toString(),
        number: `KL${random6Digits}`,
        price: 40,
        is_sold: false,
      });
    }

    await supabase.from("tickets").insert(freshTickets);
    await supabase
      .from("site_config")
      .update({ remaining_tickets: 250 })
      .eq("id", 1);

    set({ selectedTicketIds: [] });
    await get().fetchData();
  },

  // ⚙️ Update Admin Config in Database (Syncs to All Devices)
  updateAdminConfig: async (config) => {
    const dbPayload: Record<string, any> = {};

    if (config.whatsappNumber !== undefined) dbPayload.whatsapp_number = config.whatsappNumber;
    if (config.drawDate !== undefined) dbPayload.draw_date = config.drawDate;
    if (config.ticketPrice !== undefined) dbPayload.ticket_price = config.ticketPrice;
    if (config.bumperPrize !== undefined) dbPayload.bumper_prize = config.bumperPrize;
    if (config.lotterySubtitle !== undefined) dbPayload.lottery_subtitle = config.lotterySubtitle;
    if (config.upiId !== undefined) dbPayload.upi_id = config.upiId;
    if (config.remainingTicketsCount !== undefined) dbPayload.remaining_tickets = config.remainingTicketsCount;
    if (config.announcementBanner !== undefined) dbPayload.announcement_banner = config.announcementBanner;

    await supabase.from("site_config").update(dbPayload).eq("id", 1);
    await get().fetchData();
  },
}));