// import {HeroSection} from "@/components/home/HeroSection";
// import {TicketSelection} from "@/components/home/TicketSelection";
// import {BookingBar} from "@/components/home/BookingBar";
// import RecentBookingToast from "@/components/home/RecentBookingToast";

// export default function Home() {

  
//   return (

    
//     <main className="min-h-screen bg-[#070d1e] pb-28 flex flex-col items-center">
//       <div className="w-full max-w-[412px] flex flex-col items-center shadow-2xl bg-[#070d1e] min-h-screen relative overflow-x-hidden">
//         {/* Header Hero Section */}
//         <HeroSection />

//         {/* Ticket Selector Section */}
//         <TicketSelection />

//         {/* Floating Social Proof Toast */}
//         <RecentBookingToast />

//         {/* Sticky Bottom Bar & WhatsApp FAB */}
//         <BookingBar />
//       </div>
//     </main>
//   );
  
// }

"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TicketSelection } from "@/components/home/TicketSelection";
import { BookingBar } from "@/components/home/BookingBar";
import RecentBookingToast from "@/components/home/RecentBookingToast";

export default function Home() {
  const [isChrome, setIsChrome] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    // Check if browser is Google Chrome (excluding Edge, Opera, and Brave)
    const chromeDetected =
      /Chrome/.test(userAgent) &&
      !/Edg/.test(userAgent) &&
      !/OPR/.test(userAgent) &&
      !(navigator as unknown as { brave?: unknown }).brave;

    setIsChrome(chromeDetected);

    if (chromeDetected) {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  return (
    <main
      className={`min-h-screen pb-28 flex flex-col items-center transition-colors duration-200 ${
        isChrome ? "bg-[#f4f6f8]" : "bg-[#070d1e]"
      }`}
    >
      <div
        className={`w-full max-w-[412px] flex flex-col items-center shadow-2xl min-h-screen relative overflow-x-hidden ${
          isChrome ? "bg-[#f4f6f8] text-[#111827]" : "bg-[#070d1e] text-white"
        }`}
      >
        {/* Header Hero Section */}
        <HeroSection />

        {/* Ticket Selector Section */}
        <TicketSelection />

        {/* Floating Social Proof Toast */}
        <RecentBookingToast />

        {/* Sticky Bottom Bar & WhatsApp FAB */}
        <BookingBar />
      </div>
    </main>
  );
}