import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const DEFAULT_CONFIG = {
  whatsappNumber: "919000000000",
  drawDate: "15 August 2026",
  ticketPrice: 40,
  bumperPrize: "Bumper Prize ₹25 Crore",
  lotterySubtitle: "OFFICIAL STATE LOTTERY DIRECTORATE • KERALA",
  upiId: "keralalottery@upi",
  remainingTicketsCount: 76,
  announcementBanner: "🔥 MEGA DRAW CLOSING SOON! BOOK MINIMUM 3 TICKETS FOR ASSURED ENTRY.",
};

// GET: Sabhi visitors ke devices par configuration load karna
export async function GET() {
  try {
    const config = await redis.get("site_config");
    return NextResponse.json(config || DEFAULT_CONFIG);
  } catch (error) {
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

// POST: Admin Panel se new configuration save karna
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentConfig = (await redis.get("site_config")) || DEFAULT_CONFIG;
    
    const updatedConfig = { ...currentConfig, ...body };
    await redis.set("site_config", updatedConfig);

    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}