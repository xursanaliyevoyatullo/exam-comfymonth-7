import { createBrowserRouter, RouterProvider } from "react-router-dom"

//layout
import MainLayout from "./layout/MainLayout"
//pages
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Chekout from "./pages/Chekout"
import Loading from "./components/Loading"
import Orders from "./pages/Orders"
import Materials from "./components/Materials"
import Material from "./pages/Material"
import Error from "./pages/Error"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/chekout",
          element: <Chekout />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/materials",
          element: <Materials />
        },
        {
          path: "/material/:id",
          element: <Material />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])

  return (
    <div className="font-inter">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App