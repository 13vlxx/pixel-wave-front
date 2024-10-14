import { useThemeStore } from "@stores/theme/theme.store";
import { PagesAuth } from "@utils/router/routes";
import { BsSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaMoon } from "react-icons/fa";
import { LuTestTube2 } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthNavbarLayout = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleNavigate = (destination: string) => {
    navigate(destination);
  };

  return (
    <>
      <header className="sticky top-0 navbar bg-base-200 flex justify-between px-10 shadow-md md:px-20 shadow-accent/30 z-10">
        <h1
          className="text-2xl font-semibold cursor-pointer bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
          onClick={() => navigate(PagesAuth.HOME)}
        >
          PixelWave
        </h1>
        <nav className="flex gap-4">
          <LuTestTube2 className="text-2xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.DEMO)} />
          {theme === "light" ? (
            <FaMoon onClick={toggleTheme} className="cursor-pointer text-2xl" />
          ) : (
            <BsSunFill onClick={toggleTheme} className="cursor-pointer text-2xl" />
          )}
          <FaBell name="notifications" className="text-2xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.NOTIFICATIONS)} />
          <CgProfile data-cy="profile" name="profile" className="text-2xl cursor-pointer" onClick={() => handleNavigate(`${PagesAuth.PROFILE}/me`)} />
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};
