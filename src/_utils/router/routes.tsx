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
  DASHBOARD = "admin/dashboard",
  USERS = "users",
  POSTS = "posts",
  GAMES = "games",
  PLATFORMS = "platforms",
  CATEGORIES = "categories",
  ADVICES = "advices",
  STAFF_REQUESTS = "staff-requests",
}

export const useRouteMatch = (patterns: readonly string[] = []) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  const match = patterns.find((pattern) => lastPathSegment.includes(pattern));

  return match || null;
};
