import { create } from "zustand";
import { ticketFormSchema } from "~/components/ticket-form";
import { z } from "zod";

type TicketState = {
  ticket: z.infer<typeof ticketFormSchema> | null;
  setTicket: (ticket: z.infer<typeof ticketFormSchema> | null) => void;
};

export const useTicketStore = create<TicketState>((set) => ({
  ticket: null,
  setTicket: (ticket) => set({ ticket: ticket }),
  clearTicket: () => set({ ticket: null }),
}));
