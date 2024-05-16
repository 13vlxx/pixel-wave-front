import { useResponsive } from "@utils/useResponsive";
import { IoCloseSharp } from "react-icons/io5";

export interface AuthModalProps {
    children: React.ReactNode;
    handleClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
    const { children, handleClose } = props;
    const { isMobile } = useResponsive();


    if (isMobile)
        return (
            <div className="bg-base-100 h-screen fixed top-0 left-0 min-w-full z-50">
                <div className="relative top-0 flex justify-end items-center">
                    <h1 className="mx-auto text-3xl font-semibold">PixelWave</h1>
                    <IoCloseSharp className="text-5xl cursor-pointer" onClick={handleClose} />
                </div>
                <div className="px-4">
                    {children}
                </div>
            </div>
        )

    return (
        <div className="bg-base-100 h-screen fixed z-10 top-0 left-0 w-full p-4" onClick={(event) => event.stopPropagation()}>
            <h1 className="absolute capitalize text-lg">PixelWave</h1>
            <IoCloseSharp className="absolute z-50 right-0 text-4xl cursor-pointer" onClick={handleClose} />
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center flex-1">
                    {children}
                </div>
                <div className="flex-1"></div>
                <img src="https://source.unsplash.com/random/800x600" alt="auth" className="w-1/2 h-screen object-cover absolute right-0 top-0" />
            </div>
        </div >
    )
}