import { AuthAccountDropdown } from "@/components/custom/dropdown/auth-account.dropdown";
import { ThemeToggleDropdown } from "@/components/custom/dropdown/theme-toggle.dropdown";
import { UnauthAccountDropdown } from "@/components/custom/dropdown/unauth-account.dropdown";
import { AuthModal } from "@/components/custom/modals/auth.modal";
import { useAuthStore } from "@/stores/auth/auth.store";
import { Outlet } from "react-router-dom";

export const NavbarLayout = () => {
  const { isModalOpen, toggleModal, token } = useAuthStore();

  return (
    <>
      <main className="h-screen flex flex-col">
        <header className="flex justify-between p-4 items-center shadow-md shadow-secondary">
          <h1 className="text-xl font-bold">Pixel Wave</h1>
          <nav className="flex gap-2">
            <ThemeToggleDropdown />
            {token ? <AuthAccountDropdown /> : <UnauthAccountDropdown />}
          </nav>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
