import type { Route } from "./+types/home";
import { TicketForm } from "~/components/ticket-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="grid content-start gap-10">
      <div className="space-y-5">
        <h1 className="font-bold text-5xl text-balance text-center">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>

        <p className="text-balance text-center text-md text-neutral-500">
          Secure your spot at next year's biggest coding conference.
        </p>
      </div>

      <TicketForm />
    </div>
  );
}
