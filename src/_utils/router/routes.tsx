import { useLocation } from "react-router-dom";

export enum PagesAuth {
    HOME = '/',
    PROFILE = '/profile',
    NOTIFICATIONS = '/notifications',
    DEMO = '/demo',
}

export enum PagesUnauth {
    HOME = '/',
    DEMO = '/demo',
}

export const useRouteMatch = (patterns: readonly string[] = []) => {
    const { pathname } = useLocation()
    const pathSegments = pathname.split('/')
    const lastPathSegment = pathSegments[pathSegments.length - 1]

    const match = patterns.find(pattern => lastPathSegment.includes(pattern))

    return match || null
}