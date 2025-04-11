import { Ticket } from "~/components/ticket";
import { useTicketStore } from "~/store/use-ticket-store";

export default function TicketPage() {
  const ticket = useTicketStore((state) => state.ticket);

  if (!ticket) return <p>No ticket found</p>;

  const { fullName, email } = ticket;

  return (
    <div className="grid gap-24 content-start">
      <div className="space-y-5">
        <h1 className="font-bold text-4xl text-balance text-center">
          Congrats,{" "}
          <span className="bg-(image:--grad-1) bg-clip-text text-transparent">
            {fullName ? fullName : email}
          </span>
          <span className="block">Your ticket is ready.</span>
        </h1>

        <p className="text-center text-balance">
          We've emailed your ticket to{" "}
          <span className="text-orange-500">{email}</span> and will send updates
          in the run up to the event.
        </p>
      </div>

      <Ticket />
    </div>
  );
}
