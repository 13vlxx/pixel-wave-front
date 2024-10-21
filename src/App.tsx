import { PagesAuth, PagesUnauth } from "@/_utils/router/routes";
import { NavbarLayout } from "@/layouts/navbar.layout";
import { HomeScreen } from "@/screens/common/home/home.screen";
import { useAuthStore } from "@/stores/auth/auth.store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { GameScreen } from "./screens/common/game/game.screen";

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <NavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesAuth.POSTS}` },
      { path: `/${PagesAuth.POSTS}/:postId` },
      { path: `/${PagesAuth.GAME}/:name`, element: <GameScreen /> },
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
      { path: `/${PagesUnauth.GAME}/:name`, element: <GameScreen /> },
      // { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      // { path: PagesUnauth.RESET_PASSWORD, element: <ResetPasswordScreen /> },
      { path: "*", element: <HomeScreen /> },
    ],
  },
]);

function App() {
  const { token } = useAuthStore();

  return (
    <>
      <Toaster />
      <RouterProvider router={token ? authRouter : unauthRouter} />
    </>
  );
}

export default App;
