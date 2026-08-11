import HeroSection from "@/components/home/HeroSection";
import TicketSelection from "@/components/home/TicketSelection";
import BookingBar from "@/components/home/BookingBar";
import RecentBookingToast from "@/components/home/RecentBookingToast";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070d1e] pb-28 flex flex-col items-center">
      <div className="w-full max-w-[412px] flex flex-col items-center shadow-2xl bg-[#070d1e] min-h-screen relative overflow-x-hidden">
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