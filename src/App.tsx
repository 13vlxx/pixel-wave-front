import DemoScreen from '@screens/demo.screen'
import { useEffect } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { PagesAuth } from './_utils/router/routes'

const authRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <>Nav <Outlet /></>,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <div>Home</div> },
      { path: PagesAuth.DEMO, element: <DemoScreen /> },
    ]
  }
])

const unauthRouter = createBrowserRouter([
  {
    path: PagesAuth.HOME,
    element: <nav>Unauth Navbar</nav>,
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
      <Toaster />
      <RouterProvider router={authRouter || unauthRouter} />
    </>
  )
}

export default App
