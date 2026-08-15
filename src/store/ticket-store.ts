// "use client";

// import { create } from "zustand";
// import { Ticket } from "@/types/tickets";

// interface TicketStore {
//   tickets: Ticket[];
//   selectedTicketIds: string[];
//   toggleTicket: (id: string) => void;
//   selectQuickAmount: (count: number) => void;
//   clearSelection: () => void;
//   regenerateTickets: () => void;
// }

// const generateRandomTickets = (count = 250): Ticket[] => {
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
//   tickets: generateRandomTickets(250),
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

//   selectQuickAmount: (count: number) =>
//     set((state) => {
//       const firstNIds = state.tickets.slice(0, count).map((t) => t.id);
//       return { selectedTicketIds: firstNIds };
//     }),

//   clearSelection: () => set({ selectedTicketIds: [] }),

//   regenerateTickets: () =>
//     set(() => ({
//       tickets: generateRandomTickets(250),
//     })),
// }));


// "use client";

// import { create } from "zustand";
// import { Ticket } from "@/types/tickets";

// interface TicketStore {
//   tickets: Ticket[];
//   selectedTicketIds: string[];
//   // Admin Config State
//   ticketPrice: number;
//   drawDate: string;
//   whatsappNumber: string;
//   remainingTicketsCount: number;
  
//   // Actions
//   toggleTicket: (id: string) => void;
//   selectQuickAmount: (count: number) => void;
//   clearSelection: () => void;
//   regenerateTickets: () => void;
//   updateAdminConfig: (config: {
//     ticketPrice?: number;
//     drawDate?: string;
//     whatsappNumber?: string;
//     remainingTicketsCount?: number;
//   }) => void;
// }

// const generateRandomTickets = (count = 250): Ticket[] => {
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
//   tickets: generateRandomTickets(250),
//   selectedTicketIds: [],
  
//   // Default Admin Controls
//   ticketPrice: 40,
//   drawDate: "15 August 2026",
//   whatsappNumber: "919000000000",
//   remainingTicketsCount: 76,

//   toggleTicket: (id) =>
//     set((state) => {
//       const isSelected = state.selectedTicketIds.includes(id);
//       return {
//         selectedTicketIds: isSelected
//           ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
//           : [...state.selectedTicketIds, id],
//       };
//     }),

//   selectQuickAmount: (count: number) =>
//     set((state) => {
//       const firstNIds = state.tickets.slice(0, count).map((t) => t.id);
//       return { selectedTicketIds: firstNIds };
//     }),

//   clearSelection: () => set({ selectedTicketIds: [] }),

//   regenerateTickets: () =>
//     set(() => ({
//       tickets: generateRandomTickets(250),
//     })),

//   updateAdminConfig: (config) =>
//     set((state) => ({
//       ...state,
//       ...config,
//     })),
// }));



// "use client";

// import { create } from "zustand";
// import { Ticket } from "@/types/tickets";

// export interface ExtendedTicket extends Ticket {
//   isSold?: boolean;
// }

// interface TicketStore {
//   tickets: ExtendedTicket[];
//   selectedTicketIds: string[];
  
//   // Admin Config State
//   ticketPrice: number;
//   drawDate: string;
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
//   updateAdminConfig: (config: Partial<{
//     ticketPrice: number;
//     drawDate: string;
//     whatsappNumber: string;
//     upiId: string;
//     remainingTicketsCount: number;
//     announcementBanner: string;
//   }>) => void;
// }

// const generateRandomTickets = (count = 250): ExtendedTicket[] => {
//   const tickets: ExtendedTicket[] = [];
//   for (let i = 1; i <= count; i++) {
//     const random6Digits = Math.floor(100000 + Math.random() * 900000);
//     tickets.push({
//       id: i.toString(),
//       number: `KL${random6Digits}`,
//       price: 40,
//       isSold: i <= 15, // Pehle 15 tickets default sold-out demo ke liye
//     });
//   }
//   return tickets;
// };

// export const useTicketStore = create<TicketStore>((set) => ({
//   tickets: generateRandomTickets(250),
//   selectedTicketIds: [],
  
//   // Default Admin Settings
//   ticketPrice: 40,
//   drawDate: "15 August 2026",
//   whatsappNumber: "919000000000",
//   upiId: "keralalottery@upi",
//   remainingTicketsCount: 76,
//   announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",

//   toggleTicket: (id) =>
//     set((state) => {
//       const isSelected = state.selectedTicketIds.includes(id);
//       return {
//         selectedTicketIds: isSelected
//           ? state.selectedTicketIds.filter((ticketId) => ticketId !== id)
//           : [...state.selectedTicketIds, id],
//       };
//     }),

//   toggleSoldStatus: (id) =>
//     set((state) => ({
//       tickets: state.tickets.map((t) =>
//         t.id === id ? { ...t, isSold: !t.isSold } : t
//       ),
//     })),

//   addCustomTicket: (number) =>
//     set((state) => ({
//       tickets: [
//         {
//           id: (state.tickets.length + 1).toString(),
//           number: number.toUpperCase(),
//           price: state.ticketPrice,
//           isSold: false,
//         },
//         ...state.tickets,
//       ],
//     })),

//   selectQuickAmount: (count: number) =>
//     set((state) => {
//       const availableTickets = state.tickets.filter((t) => !t.isSold);
//       const firstNIds = availableTickets.slice(0, count).map((t) => t.id);
//       return { selectedTicketIds: firstNIds };
//     }),

//   clearSelection: () => set({ selectedTicketIds: [] }),

//   regenerateTickets: () =>
//     set(() => ({
//       tickets: generateRandomTickets(250),
//       selectedTicketIds: [],
//     })),

//   updateAdminConfig: (config) =>
//     set((state) => ({
//       ...state,
//       ...config,
//     })),
// }));


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
//   drawDate: string;
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
//   updateAdminConfig: (config: Partial<{
//     ticketPrice: number;
//     drawDate: string;
//     whatsappNumber: string;
//     upiId: string;
//     remainingTicketsCount: number;
//     announcementBanner: string;
//   }>) => void;
// }

// // Fixed Seed Generator for initial SSR load
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
//       drawDate: "15 August 2026",
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

//       // 🎲 Randomly Regenerate All Tickets
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

//       // 🚨 Full System Reset (Resets Stats, Inventory & Clear Sales)
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
//   drawDate: string;
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
//   resetSpecificTickets: (ticketIds: string[]) => void; // 🎯 New Action for resetting specific tickets
//   updateAdminConfig: (config: Partial<{
//     ticketPrice: number;
//     drawDate: string;
//     whatsappNumber: string;
//     upiId: string;
//     remainingTicketsCount: number;
//     announcementBanner: string;
//   }>) => void;
// }

// // Fixed Seed Generator for initial SSR load
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
//       drawDate: "15 August 2026",
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

//       // 🔄 Reset Specific Array of Ticket IDs back to Available (isSold: false)
//       resetSpecificTickets: (ticketIds: string[]) =>
//         set((state) => ({
//           tickets: state.tickets.map((t) =>
//             ticketIds.includes(t.id) ? { ...t, isSold: false } : t
//           ),
//         })),

//       // 🎲 Randomly Regenerate All Tickets
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

//       // 🚨 Full System Reset
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
import { persist, createJSONStorage } from "zustand/middleware";
import { Ticket } from "@/types/tickets";

export interface ExtendedTicket extends Ticket {
  isSold?: boolean;
}

interface TicketStore {
  tickets: ExtendedTicket[];
  selectedTicketIds: string[];
  
  // Admin Config State
  ticketPrice: number;
  drawDate: string;           // 👈 Can be string or empty "" to hide from UI
  bumperPrize: string;
  lotterySubtitle: string;
  whatsappNumber: string;
  upiId: string;
  remainingTicketsCount: number;
  announcementBanner: string;
  
  // Actions
  toggleTicket: (id: string) => void;
  toggleSoldStatus: (id: string) => void;
  addCustomTicket: (number: string) => void;
  selectQuickAmount: (count: number) => void;
  clearSelection: () => void;
  regenerateTickets: () => void;
  resetSystemState: () => void;
  resetSpecificTickets: (ticketIds: string[]) => void;
  updateAdminConfig: (config: Partial<{
    ticketPrice: number;
    drawDate: string;
    bumperPrize: string;
    lotterySubtitle: string;
    whatsappNumber: string;
    upiId: string;
    remainingTicketsCount: number;
    announcementBanner: string;
  }>) => void;
}

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

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      tickets: generateInitialTickets(250),
      selectedTicketIds: [],
      
      // Default Admin Controls
      ticketPrice: 40,
      drawDate: "15 August 2026", // Clean fallback default
      bumperPrize: "Bumper Prize ₹25 Crore",
      lotterySubtitle: "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
      whatsappNumber: "919000000000",
      upiId: "keralalottery@upi",
      remainingTicketsCount: 76,
      announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",

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

      updateAdminConfig: (config) =>
        set((state) => ({
          ...state,
          ...config,
        })),
    }),
    {
      name: "kerala-lottery-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);