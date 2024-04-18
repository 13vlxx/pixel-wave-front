import { useEffect, useState } from 'react';

export enum ScreenSizeEnum {
    MOBILE = 'mobile',
    TABLET = 'tablet',
    DEKSTOP = 'dekstop',
    XL_DEKSTOP = 'xl_dekstop',
}

export const useResponsive = () => {
    const [screenSize, setScreenSize] = useState<ScreenSizeEnum>(ScreenSizeEnum.MOBILE);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;

            if (width < 768) {
                setScreenSize(ScreenSizeEnum.MOBILE);
            } else {
                setScreenSize(ScreenSizeEnum.DEKSTOP);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return { screenSize };
};