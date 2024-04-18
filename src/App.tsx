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
      { path: PagesAuth.DEMO, element: <div>Demo</div> },
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
      { path: PagesAuth.DEMO, element: <div>Demo</div> },
    ]
  }
])

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={authRouter || unauthRouter} />
    </>
  )
}

export default App
