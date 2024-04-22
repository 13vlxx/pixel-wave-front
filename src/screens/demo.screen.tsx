import { Modal } from "@layouts/modal.layout";
import { useAuthStore } from "@stores/auth/auth.store";
import { PagesUnauth } from "@utils/router/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DemoScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const { logout } = useAuthStore()
    const navigate = useNavigate();

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

    const toggleLogout = () => {
        logout();
    }

    const shareData = {
        title: 'Web Share API',
        text: 'Check out Web Share API',
        url: 'http://localhost:5173/profile',
    }

    const toggleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } catch (err) {
                console.error('Error: ' + err);
            }
        } else {
            console.log('Web Share API not supported');
        }
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-fit">
                <button className="border-accent" onClick={handleToast}>Toast</button>
                <button className="border-accent" onClick={toggleShowModal}>Show modal</button>
                <button className="border-accent" onClick={toggleLogout}>Logout</button>
                <button className="border-accent" onClick={() => navigate(PagesUnauth.RESET_PASSWORD)}>Reset-password</button>
                <button className="border-accent" onClick={toggleShare}>Share</button>
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