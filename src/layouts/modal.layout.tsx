import { useResponsive } from "@utils/useResponsive";
import { IoCloseSharp } from "react-icons/io5";

export interface ModalProps {
    title?: string;
    children: React.ReactNode;
    handleClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { title, children, handleClose } = props;
    const { isMobile } = useResponsive();


    if (isMobile)
        return (
            <div className="bg-base-100 min-h-screen absolute top-0 left-0 min-w-full z-50">
                <div className="flex justify-end">
                    <IoCloseSharp className="text-5xl" onClick={handleClose} />
                </div>
                {children}
            </div>
        )

    return (
        <div
            className="bg-black/50 min-h-screen absolute top-0 left-0 min-w-full z-50 flex items-center justify-center"
            onClick={handleClose}>
            <div className="bg-white w-2/5 rounded-md p-4 text-black" onClick={(event) => event.stopPropagation()}>
                <div className="flex justify-center items-center">
                    <h1 className="mx-auto capitalize text-lg">{title}</h1>
                    <IoCloseSharp className="text-4xl cursor-pointer" onClick={handleClose} />
                </div>
                {children}
            </div>
        </div>
    )
}