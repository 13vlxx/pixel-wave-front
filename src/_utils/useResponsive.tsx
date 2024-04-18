import { useEffect, useState } from 'react';

const useResponsive = () => {
    const [screenSize, setScreenSize] = useState('');

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setScreenSize('mobile');
            } else if (width >= 640 && width < 768) {
                setScreenSize('tablet');
            } else if (width >= 768 && width < 1024) {
                setScreenSize('dekstop');
            } else if (width >= 1024) {
                setScreenSize('xl_dekstop');
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return { screenSize };
};