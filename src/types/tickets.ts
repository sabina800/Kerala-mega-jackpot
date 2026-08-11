export interface Ticket {
  id: string;
  number: string;
  price: number;
}

export interface BookingToast {
  id: string;
  name: string;
  location: string;
  ticketNumber: string;
  timeAgo: string;
}