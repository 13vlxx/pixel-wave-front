import { ScreenSizeEnum, useResponsive } from "@utils/useResponsive";
import { BsAirplane } from "react-icons/bs";
import { toast } from "sonner";

export default function DemoScreen() {
    const { screenSize } = useResponsive();



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

    if (screenSize === ScreenSizeEnum.MOBILE)
        return (
            <div>
                <button onClick={handleToast}>Toast</button>
            </div>
        )

    return (
        <div>
            <h1>Demo</h1>
            <button>Change theme</button>
            <BsAirplane className="text-9xl" />
        </div>
    )
}
