import { AuthNavbarLayout } from '@layouts/auth-navbar.layout'
import { UnauthNavbarLayout } from '@layouts/unauth-navbar.layout'
import NotificationsScreen from '@screens/auth/notifications/notifications.screen'
import ProfileByIdScreen from '@screens/auth/profile/profile-by-id.screen'
import ProfileScreen from '@screens/auth/profile/profile.screen'
import StaffRequestScreen from '@screens/auth/staff-request/staff-request.screen'
import GameDetailsScreen from '@screens/common/game/game-details.screen'
import HomeScreen from '@screens/common/home/home.screen'
import DemoScreen from '@screens/demo.screen'
import ResetPasswordScreen from '@screens/unauth/reset-password.screen'
import { useAuthStore } from '@stores/auth/auth.store'
import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PagesAuth, PagesUnauth } from './_utils/router/routes'

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <AuthNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesUnauth.GAME}/:name`, element: <GameDetailsScreen /> },
      { path: PagesAuth.NOTIFICATIONS, element: <NotificationsScreen /> },
      { path: `${PagesAuth.PROFILE}/me`, element: <ProfileScreen /> },
      { path: `${PagesAuth.PROFILE}/:userId`, element: <ProfileByIdScreen /> },
      { path: PagesAuth.STAFF_REQUEST, element: <StaffRequestScreen /> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
    ]
  }
])

const unauthRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <UnauthNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: `/${PagesUnauth.GAME}/:name`, element: <GameDetailsScreen /> },
      { path: PagesUnauth.RESET_PASSWORD, element: <ResetPasswordScreen /> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
    ]
  }
])

function App() {
  const { token } = useAuthStore()

  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
      document.documentElement.setAttribute('data-theme', preferredTheme);
    }
  }, []);

  return (
    <>
      <Toaster richColors theme="light" />
      <RouterProvider router={token ? authRouter : unauthRouter} />
    </>
  )
}

export default App