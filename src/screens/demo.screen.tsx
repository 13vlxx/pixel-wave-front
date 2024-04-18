import { BsAirplane } from "react-icons/bs";

export default function DemoScreen() {

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <div>
            <h1>Demo</h1>
            <button onClick={toggleTheme}>Change theme</button>
            <BsAirplane className="text-blue-300 text-9xl" />
        </div>
    )
}
