import AuthForm from "@components/forms/auth/auth.form";
import { AuthModal } from "@components/modals/auth.modal";
import { useAuthStore } from "@stores/auth/auth.store";
import { useThemeStore } from "@stores/theme/theme.store";
import { PagesAuth } from "@utils/router/routes";
import { useLayoutEffect } from "react";
import { BsSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { LuTestTube2 } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";

export const UnauthNavbarLayout = () => {
    const { theme, setTheme } = useThemeStore();
    const { isModalOpen, toggleModal } = useAuthStore();
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    const handleNavigate = (destination: PagesAuth) => {
        navigate(destination);
    }

    useLayoutEffect(() => {
        return () => {
            document.body.classList.remove('modal-open');
        }
    }, [])

    return (
        <>
            <header className="sticky top-0 navbar bg-base-200 flex justify-between px-10 shadow-md md:px-20 shadow-accent/30 z-10">
                <h1 className="text-2xl font-semibold cursor-pointer bg-gradient-to-l from-accent to-secondary text-transparent bg-clip-text" onClick={() => navigate(PagesAuth.HOME)}>PixelWave</h1>
                <nav className="flex gap-4">
                    <LuTestTube2 className="text-3xl cursor-pointer" onClick={() => handleNavigate(PagesAuth.DEMO)} />
                    {theme === 'light' ?
                        <FaMoon onClick={toggleTheme} className="cursor-pointer text-3xl" /> :
                        <BsSunFill onClick={toggleTheme} className="cursor-pointer text-3xl" />
                    }
                    <CgProfile data-cy="auth-modal" name="profile" className="text-3xl cursor-pointer" onClick={toggleModal} />
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
            {isModalOpen && (
                <AuthModal handleClose={toggleModal}>
                    <AuthForm />
                </AuthModal>
            )}
        </>
    )
}