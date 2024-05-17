import { useResponsive } from "@utils/useResponsive";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export interface ModalProps {
    isFullscreen?: boolean;
    children: React.ReactNode;
    handleClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { children, handleClose } = props;
    const { isMobile } = useResponsive();

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }
    })

    if (isMobile)
        return (
            <div className="bg-base-100 h-screen fixed top-0 left-0 min-w-full z-10 flex flex-col justify-center px-4 py-20">
                <div className="absolute top-2 right-4">
                    <IoCloseSharp className="text-5xl cursor-pointer" onClick={handleClose} />
                </div>
                {children}
            </div>
        )

    return (
        <div
            className="bg-base-100 min-h-screen absolute top-0 left-0 min-w-full z-50 flex items-center justify-center"
            onClick={handleClose}>
            <div className="bg-white w-2/5 max-w-[500px] rounded-md p-4 text-black" onClick={(event) => event.stopPropagation()}>
                <div className="flex justify-center items-center">
                    <IoCloseSharp className="text-4xl cursor-pointer" onClick={handleClose} />
                </div>
                <div className="flex justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}