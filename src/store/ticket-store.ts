// "use client";

// import { create } from "zustand";
// import { Ticket } from "@/types/tickets";

// interface TicketStore {
//   tickets: Ticket[];
//   selectedTicketIds: string[];
//   toggleTicket: (id: string) => void;
//   clearSelection: () => void;
//   regenerateTickets: () => void;
// }

// // Random Kerala-style Ticket Generator (e.g., KL123456)
// const generateRandomTickets = (count = 50): Ticket[] => {
//   const tickets: Ticket[] = [];
//   for (let i = 1; i <= count; i++) {
//     const random6Digits = Math.floor(100000 + Math.random() * 900000);
//     tickets.push({
//       id: i.toString(),
//       number: `KL${random6Digits}`,
//       price: 40,
//     });
//   }
//   return tickets;
// };

// export const useTicketStore = create<TicketStore>((set) => ({
//   tickets: generateRandomTickets(50),
//   selectedTicketIds: [],

//   toggleTicket: (id) =>
//     set((state) => {
//       const isSelected = state.selectedTicketIds.includes(id);
//       return {
//         selectedTicketIds: isSelected
//           ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
//           : [...state.selectedTicketIds, id],
//       };
//     }),

//   clearSelection: () => set({ selectedTicketIds: [] }),

//   regenerateTickets: () =>
//     set(() => ({
//       tickets: generateRandomTickets(50),
//     })),
// }));

"use client";

import { create } from "zustand";
import { Ticket } from "@/types/tickets";

interface TicketStore {
  tickets: Ticket[];
  selectedTicketIds: string[];
  toggleTicket: (id: string) => void;
  clearSelection: () => void;
  regenerateTickets: () => void;
}

const generateRandomTickets = (count = 250): Ticket[] => {
  const tickets: Ticket[] = [];
  for (let i = 1; i <= count; i++) {
    const random6Digits = Math.floor(100000 + Math.random() * 900000);
    tickets.push({
      id: i.toString(),
      number: `KL${random6Digits}`,
      price: 40,
    });
  }
  return tickets;
};

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [], // Keep empty initially to avoid server/client mismatch
  selectedTicketIds: [],

  toggleTicket: (id) =>
    set((state) => {
      const isSelected = state.selectedTicketIds.includes(id);
      return {
        selectedTicketIds: isSelected
          ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
          : [...state.selectedTicketIds, id],
      };
    }),

  clearSelection: () => set({ selectedTicketIds: [] }),

  regenerateTickets: () =>
    set(() => ({
      tickets: generateRandomTickets(250),
    })),
}));