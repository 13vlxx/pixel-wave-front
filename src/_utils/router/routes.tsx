import { useLocation } from "react-router-dom";

export enum PagesAuth {
  HOME = "/",
  GAME = "game",
  PROFILE = "profile",
  POSTS = "posts",
  NOTIFICATIONS = "notifications",
  STAFF_REQUEST = "staff-request",
  DEMO = "demo",
}

export enum PagesUnauth {
  HOME = "/",
  GAME = "game",
  POSTS = "posts",
  RESET_PASSWORD = "reset-password",
  DEMO = "demo",
}

export enum PagesBackoffice {
  BACKOFFICE = "backoffice",
  USERS = "backoffice/users",
  POSTS = "backoffice/posts",
  GAMES = "backoffice/games",
  PLATFORMS = "backoffice/platforms",
  CATEGORIES = "backoffice/categories",
  ADVICES = "backoffice/advices",
  STAFF_REQUESTS = "backoffice/staff-requests",
}

export const useRouteMatch = (patterns: readonly string[] = []) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const match = patterns.find((pattern) => lastPathSegment.includes(pattern));

  return match || null;
};
