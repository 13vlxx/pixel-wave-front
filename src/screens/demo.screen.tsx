import { ScreenSizeEnum, useResponsive } from "@utils/useResponsive";
import { BsAirplane } from "react-icons/bs";
import { toast } from "sonner";

export default function DemoScreen() {
    const { screenSize } = useResponsive();

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (screenSize === ScreenSizeEnum.MOBILE)
        return (
            <div>
                <button onClick={() => toast.info("Erreur")}>Toast</button>
            </div>
        )

    return (
        <div>
            <h1>Demo</h1>
            <button onClick={toggleTheme}>Change theme</button>
            <BsAirplane className="text-9xl" />
        </div>
    )
}
