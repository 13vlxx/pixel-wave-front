import { AuthAccountDropdown } from "@/components/custom/dropdown/auth-account.dropdown";
import { ThemeToggleDropdown } from "@/components/custom/dropdown/theme-toggle.dropdown";
import { UnauthAccountDropdown } from "@/components/custom/dropdown/unauth-account.dropdown";
import { AuthModal } from "@/components/custom/modals/auth.modal";
import { useAuthStore } from "@/stores/auth/auth.store";
import { Link, Outlet } from "react-router-dom";

export const NavbarLayout = () => {
  const { isModalOpen, toggleModal, token } = useAuthStore();
  const isDev = import.meta.env.VITE_ENVIRONMENT === "dev";

  return (
    <>
      <header className="flex justify-between p-4 items-center shadow-lg shadow-primary/10 sticky top-0 left-0 z-50 bg-background/50 backdrop-blur-md">
        {isDev && (
          <div className="absolute top-4 left-4 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 w-screen py-1 text-xs text-center -rotate-45 font-bold">
            DEV
          </div>
        )}
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
          Pixel Wave
        </Link>
        <nav className="flex gap-2">
          <ThemeToggleDropdown />
          {token ? <AuthAccountDropdown /> : <UnauthAccountDropdown />}
        </nav>
      </header>
      <div className="overflow-y-auto">
        <Outlet />
      </div>
      <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
