import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { tickets, totalAmount, totalCount, userName, userPhone } = await req.json();

    // Nodemailer Transporter Configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const ticketListHtml = tickets
      .map((t: string) => `<li style="font-size: 16px; font-weight: bold; color: #d97706;">${t}</li>`)
      .join('');

    // Mail Options
    const mailOptions = {
      from: `"Kerala Lottery App" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_RECIEVER_EMAIL,
      subject: `🚨 New Ticket Booking Request (${totalCount} Tickets) - ₹${totalAmount}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 10px;">
          <h2 style="color: #070d1e;">🎟️ New Booking Received!</h2>
          <p><strong>Customer Name:</strong> ${userName || 'Not Provided'}</p>
          <p><strong>Customer Phone:</strong> ${userPhone || 'Not Provided'}</p>
          <p><strong>Total Tickets:</strong> ${totalCount}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
          
          <h3>Selected Tickets:</h3>
          <ul>
            ${ticketListHtml}
          </ul>
          
          <hr style="margin-top: 20px;" />
          <p style="font-size: 12px; color: #6b7280;">This email was automatically sent from your Kerala Mega Jackpot web app.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, error: 'Email sending failed' }, { status: 500 });
  }
}