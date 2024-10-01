import { AuthNavbarLayout } from "@layouts/auth-navbar.layout";
import { UnauthNavbarLayout } from "@layouts/unauth-navbar.layout";
import NotificationsScreen from "@screens/auth/notifications/notifications.screen";
import ProfileByIdScreen from "@screens/auth/profile/profile-by-id.screen";
import ProfileScreen from "@screens/auth/profile/profile.screen";
import StaffRequestScreen from "@screens/auth/staff-request/staff-request.screen";
import GameDetailsScreen from "@screens/common/game/game-details.screen";
import HomeScreen from "@screens/common/home/home.screen";
import PostFeedScreen from "@screens/common/post/post-feed.screen";
import DemoScreen from "@screens/demo.screen";
import ResetPasswordScreen from "@screens/unauth/reset-password.screen";
import { useAuthStore } from "@stores/auth/auth.store";
import { useThemeStore } from "@stores/theme/theme.store";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { PagesAuth, PagesBackoffice, PagesUnauth } from "./_utils/router/routes";
import { AdminNavbarLayout } from "./layouts/admin-navbar.layout";
import { AdminDashboardScreen } from "./screens/admin/dashbaord/admin-dashboard.screen";
import { UsersTable } from "./screens/admin/tables/users.table";
import PostByIdScreen from "./screens/common/post/post-by-id.screen";

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <AuthNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesAuth.POSTS}`, element: <PostFeedScreen /> },
      { path: `/${PagesAuth.POSTS}/:postId`, element: <PostByIdScreen /> },
      { path: `/${PagesAuth.GAME}/:name`, element: <GameDetailsScreen /> },
      { path: PagesAuth.NOTIFICATIONS, element: <NotificationsScreen /> },
      { path: `${PagesAuth.PROFILE}/me`, element: <ProfileScreen /> },
      { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      { path: PagesAuth.STAFF_REQUEST, element: <StaffRequestScreen /> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
    ],
  },
  {
    path: PagesBackoffice.DASHBOARD,
    element: <AdminNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <AdminDashboardScreen />,
      },
      {
        path: PagesBackoffice.USERS,
        element: <UsersTable />,
      },
    ],
  },
]);

const unauthRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <UnauthNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesUnauth.POSTS}`, element: <PostFeedScreen /> },
      { path: `/${PagesAuth.POSTS}/:postId`, element: <PostByIdScreen /> },
      { path: `/${PagesUnauth.GAME}/:name`, element: <GameDetailsScreen /> },
      { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      { path: PagesUnauth.RESET_PASSWORD, element: <ResetPasswordScreen /> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
      { path: "*", element: <HomeScreen /> },
    ],
  },
]);

function App() {
  const { token } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Toaster richColors theme={theme} />
      <RouterProvider router={token ? authRouter : unauthRouter} />
    </>
  );
}

export default App;
