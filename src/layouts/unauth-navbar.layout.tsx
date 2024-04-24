import AuthForm from "@components/forms/auth/auth.form";
import { AuthModal } from "@components/modals/auth.modal";
import { PagesAuth } from "@utils/router/routes";
import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { LuTestTube2 } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";

export const UnauthNavbarLayout = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    const toggleShowAuthModal = () => {
        setShowAuthModal(!showAuthModal);
    }

    const handleNavigate = (destination: PagesAuth) => {
        navigate(destination);
    }

    return (
        <>
            <header className="navbar bg-primary flex justify-between px-10 shadow-md md:px-20 shadow-accent/30 mb-4">
                <h1 className="text-2xl font-semibold cursor-pointer" onClick={() => navigate(PagesAuth.HOME)}>PixelWave</h1>
                <nav className="flex gap-4">
                    <LuTestTube2 className="text-3xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.DEMO)} />
                    {theme === 'light' ?
                        <FaMoon onClick={toggleTheme} className="cursor-pointer text-3xl" /> :
                        <BsSunFill onClick={toggleTheme} className="cursor-pointer text-3xl" />
                    }
                    <CgProfile name="profile" className="text-3xl cursor-pointer" onClick={toggleShowAuthModal} />
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
            {showAuthModal && (
                <AuthModal handleClose={toggleShowAuthModal}>
                    <AuthForm />
                </AuthModal>
            )}
        </>
    )
}