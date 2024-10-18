import { PagesAuth } from "@/_utils/router/routes";
import { NavbarLayout } from "@/layouts/navbar.layout";
import { HomeScreen } from "@/screens/common/home/home.screen";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "./_utils/theme-provider";

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <NavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesAuth.POSTS}` },
      { path: `/${PagesAuth.POSTS}/:postId` },
      { path: `/${PagesAuth.GAME}/:name` },
      { path: PagesAuth.NOTIFICATIONS },
      { path: `${PagesAuth.PROFILE}/me` },
      { path: `${PagesAuth.PROFILE}/:userId` },
      { path: PagesAuth.STAFF_REQUEST },
      { path: PagesAuth.DEMO },
    ],
  },
  // {
  //   path: PagesBackoffice.DASHBOARD,
  //   element: <AdminNavbarLayout />,
  //   errorElement: <div>404</div>,
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminDashboardScreen />,
  //     },
  //     {
  //       path: PagesBackoffice.USERS,
  //       element: <UsersTable />,
  //     },
  //     { path: PagesBackoffice.CATEGORIES, element: <CategoriesScreen /> },
  //     { path: PagesBackoffice.PLATFORMS, element: <PlatformsTable /> },
  //     { path: PagesBackoffice.GAMES, element: <GamesTable /> },
  //     { path: PagesBackoffice.POSTS, element: <PostsTable /> },
  //     { path: PagesBackoffice.STAFF_REQUESTS, element: <StaffRequestAdminScreen /> },
  //   ],
  // },
]);

const unauthRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <NavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      // { path: `/${PagesUnauth.POSTS}`, element: <PostFeedScreen /> },
      // { path: `/${PagesAuth.POSTS}/:postId`, element: <PostByIdScreen /> },
      // { path: `/${PagesUnauth.GAME}/:name`, element: <GameDetailsScreen /> },
      // { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      // { path: PagesUnauth.RESET_PASSWORD, element: <ResetPasswordScreen /> },
      // { path: PagesAuth.DEMO, element: <DemoScreen /> },
      { path: "*", element: <HomeScreen /> },
    ],
  },
]);

function App() {
  const { token } = useAuthStore();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Toaster richColors />
      <RouterProvider router={token ? authRouter : unauthRouter} />
    </>
  );
}

export default App;
