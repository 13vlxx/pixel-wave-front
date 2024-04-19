import { Modal } from "@layouts/modal.layout";
import { useResponsive } from "@utils/useResponsive";
import { useState } from "react";
import { toast } from "sonner";

const DemoScreen = () => {
    const { isMobile } = useResponsive();
    const [showModal, setShowModal] = useState(false);

    const handleToast = () => {
        toast("Valider les changements ?", {
            duration: 5000,
            action: {
                label: 'Valider',
                onClick: () => {
                    toast('Changements validés', {
                        duration: 5000,
                    });
                },
            },

        });
    }

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    if (isMobile)
        return (
            <div>
                <div className="flex flex-col gap-2">
                    <button className="border-accent" onClick={handleToast}>Toast</button>
                    <button className="border-accent" onClick={toggleShowModal}>Show modal</button>
                </div>
                {showModal && (
                    <Modal handleClose={handleCloseModal}>
                        <h1>Alex</h1>
                    </Modal>
                )}
            </div>
        )

    return (
        <>
            <div className="flex flex-col gap-2 w-fit">
                <button className="border-accent" onClick={handleToast}>Toast</button>
                <button className="border-accent" onClick={toggleShowModal}>Show modal</button>
            </div>
            {showModal && (
                <Modal title="Modale" handleClose={handleCloseModal}>
                    <h1>Hello</h1>
                </Modal>
            )}
        </>
    )
}

export default DemoScreen;