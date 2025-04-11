import Logo from "~/assets/images/logo-full.svg?react";

export const Header = () => {
  return (
    <header className="full-width py-6 justify-items-center">
      <a href="/">
        <Logo className="w-32" />
      </a>
    </header>
  );
};
