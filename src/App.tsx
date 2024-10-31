import { PagesAuth, PagesBackoffice, PagesUnauth } from "@/_utils/router/routes";
import { Toaster } from "@/components/ui/sonner";
import { BackofficeLayout } from "@/layouts/backoffice.layout";
import { NavbarLayout } from "@/layouts/navbar.layout";
import { ProfileByIdScreen } from "@/screens/auth/profile/profile-by-id.screen";
import { ProfileScreen } from "@/screens/auth/profile/profile.screen";
import { GameScreen } from "@/screens/common/game/game.screen";
import { HomeScreen } from "@/screens/common/home/home.screen";
import { PostFeedScreen } from "@/screens/common/post/post-feed.screen";
import { PostScreen } from "@/screens/common/post/post.screen";
import { useAuthStore } from "@/stores/auth/auth.store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BackofficeUsersScreen } from "./screens/auth/backoffice/users.screen";

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <NavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesAuth.POSTS}`, element: <PostFeedScreen /> },
      { path: `/${PagesAuth.POSTS}/:postId`, element: <PostScreen /> },
      { path: `/${PagesAuth.GAME}/:name`, element: <GameScreen /> },
      { path: PagesAuth.NOTIFICATIONS },
      { path: `/${PagesAuth.PROFILE}/me`, element: <ProfileScreen /> },
      { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      { path: PagesAuth.STAFF_REQUEST },
      { path: PagesAuth.DEMO },
    ],
  },
  {
    path: PagesBackoffice.BACKOFFICE,
    element: <BackofficeLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <p>Home</p> },
      { path: "users", element: <BackofficeUsersScreen /> },
    ],
  },
]);

const unauthRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <NavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesAuth.POSTS}`, element: <PostFeedScreen /> },
      // { path: `/${PagesAuth.POSTS}/:postId`, element: <PostByIdScreen /> },
      { path: `/${PagesUnauth.GAME}/:name`, element: <GameScreen /> },
      { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
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
