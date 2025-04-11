import { useTicketStore } from "~/store/use-ticket-store";

import LogoMark from "~/assets/images/logo-mark.svg?react";
import GitHubIcon from "~/assets/images/icon-github.svg?react";
import TicketPattern from "~/assets/images/pattern-ticket.svg?react";
import defaultAvatarUrl from "~/assets/images/image-avatar.jpg";

export const Ticket = () => {
  const ticket = useTicketStore((state) => state.ticket);

  if (!ticket) return <p>No ticket found</p>;

  const { fullName, githubUsername, avatar, email } = ticket;

  const avatarUrl = avatar ? URL.createObjectURL(avatar[0]) : undefined;

  return (
    // using a container query rather than relying on the viewport size to resize content
    // because we want to apply styles based on the width of the ticket itself which doesn't
    // align with the viewport size
    <div className="relative @container">
      {/* using the actual image rather than a bg-image so we have a defined space and arent working with a 0 height div */}
      <TicketPattern className="size-full" />

      <div className="flex items-start gap-3 absolute top-5 left-5 @md:top-7 @md:left-7">
        <LogoMark className="size-7 @md:size-10" />
        <div className="space-y-2 @md:space-y-4">
          <p className="text-2xl @md:text-4xl font-bold leading-5">
            Coding Conf
          </p>
          <p className="text-neutral-300 text-sm @md:text-xl">
            Jan 31, 2025 / Austin, TX
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 absolute bottom-5 left-5 @md:bottom-7 @md:left-7">
        {avatar ? (
          <img
            className="size-10 @md:size-20 rounded-lg"
            src={avatarUrl}
            alt=""
          />
        ) : (
          <img
            className="size-10 @md:size-20 rounded-lg"
            src={defaultAvatarUrl}
            alt=""
          />
        )}
        <div className="space-y-1">
          <p className="text-lg @md:text-2xl font-medium">
            {fullName ? fullName : email}
          </p>
          {githubUsername && (
            <div className="flex items-center gap-2">
              <GitHubIcon />
              <p className="text-neutral-300 text-xl">{githubUsername}</p>
            </div>
          )}
        </div>
      </div>

      <p className="absolute @md:-right-10 -right-7 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-xl @md:text-3xl text-neutral-500">
        #01609
      </p>
    </div>
  );
};
