
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./component/Layout/Layout";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Home } from "./pages/home/Home";
import { Browesermovie } from "./pages/Browesermovie/Browesermovie";
import { Moviedetails } from "./pages/MoviesDetails/Moviedetails";
import { Trending } from "./pages/Trending/Trending";
import { AuthModal } from "./pages/authmodel/authmodel";
import { useState } from "react";


export default function App() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("login");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout
            openLogin={() => {
              setTab("login");
              setOpen(true);
            }}
            openSignup={() => {
              setTab("signup");
              setOpen(true);
            }}
          />
          <AuthModal
            open={open}
            close={() => setOpen(false)}
            tab={tab}
            setTab={setTab}
          />
        </>
      ),
      children: [
       { path: "/home",
      element: <Home />},
        { index: true, element: <Home /> },
        { path: "/BroweserMovie", element: <Browesermovie /> },
        { path: "/moviedetails/:id", element: <Moviedetails /> },
        { path: "/Trending", element: <Trending /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}