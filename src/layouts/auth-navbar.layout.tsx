import { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { FaBell, FaMoon, FaRegSun } from "react-icons/fa"
import { Outlet } from "react-router-dom"

export const AuthNavbarLayout = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'DarkMode' : 'light';
        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <>
            <header className="navbar flex justify-between px-10 shadow-lg md:px-20">
                <h1 className="text-2xl">PixelWave</h1>
                <nav className="flex gap-2">
                    {theme === 'light' ?
                        <FaMoon onClick={toggleTheme} className="cursor-pointer text-3xl" /> :
                        <FaRegSun onClick={toggleTheme} className="cursor-pointer text-3xl" />
                    }
                    <FaBell className="text-3xl" onClick={() => console.log(localStorage.getItem("theme"))} />
                    <CgProfile className="text-3xl" />
                </nav>
            </header>
            <Outlet />
        </>
    )
}