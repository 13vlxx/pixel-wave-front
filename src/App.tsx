import { AuthNavbarLayout } from '@layouts/auth-navbar.layout'
import { UnauthNavbarLayout } from '@layouts/unauth-navbar.layout'
import NotificationsScreen from '@screens/auth/notifications.screen'
import ProfileScreen from '@screens/auth/profile.screen'
import DemoScreen from '@screens/demo.screen'
import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PagesAuth } from './_utils/router/routes'

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <AuthNavbarLayout />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <div>Home</div> },
      { path: PagesAuth.NOTIFICATIONS, element: <NotificationsScreen /> },
      { path: PagesAuth.PROFILE, element: <ProfileScreen /> },
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
      { index: true, element: <div>Home</div> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
    ]
  }
])

function App() {
  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
      document.documentElement.setAttribute('data-theme', preferredTheme);
    }
  }, []);

  return (
    <>
      <Toaster richColors theme="light" />
      <RouterProvider router={unauthRouter} />
    </>
  )
}

export default App
