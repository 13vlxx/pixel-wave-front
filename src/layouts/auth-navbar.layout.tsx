import { PagesAuth } from "@utils/router/routes";
import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaMoon } from "react-icons/fa";
import { LuTestTube2 } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthNavbarLayout = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    const handleNavigate = (destination: PagesAuth) => {
        navigate(destination);
    }

    return (
        <>
            <header className="sticky top-0 navbar bg-primary flex justify-between px-10 shadow-md md:px-20 shadow-secondary/30 mb-4 z-1">
                <h1 className="text-2xl font-semibold cursor-pointer" onClick={() => navigate(PagesAuth.HOME)}>PixelWave</h1>
                <nav className="flex gap-4">
                    <LuTestTube2 className="text-3xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.DEMO)} />
                    {theme === 'light' ?
                        <FaMoon onClick={toggleTheme} className="cursor-pointer text-3xl" /> :
                        <BsSunFill onClick={toggleTheme} className="cursor-pointer text-3xl" />
                    }
                    <FaBell name="notifications" className="text-3xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.NOTIFICATIONS)} />
                    <CgProfile name="profile" className="text-3xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.PROFILE)} />
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
        </>
    )
}