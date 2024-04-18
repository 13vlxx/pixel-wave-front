import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaMoon } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export const AuthNavbarLayout = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <>
            <header className="navbar flex justify-between px-10 shadow-md md:px-20 shadow-accent mb-4">
                <h1 className="text-2xl font-semibold">PixelWave</h1>
                <nav className="flex gap-2">
                    {theme === 'light' ?
                        <FaMoon onClick={toggleTheme} className="cursor-pointer text-3xl" /> :
                        <BsSunFill onClick={toggleTheme} className="cursor-pointer text-3xl" />
                    }
                    <FaBell className="text-3xl" onClick={() => console.log(localStorage.getItem("theme"))} />
                    <CgProfile className="text-3xl" />
                </nav>
            </header>
            <Outlet />
        </>
    )
}