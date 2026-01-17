
import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./component/Layout/Layout";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/login/signup/Signup";
import { Home } from "./pages/home/Home";
import { Browesermovie } from "./pages/Browesermovie/Browesermovie";
import { Moviedetails } from "./pages/MoviesDetails/Moviedetails";


export default function App() {
  const router = createBrowserRouter([
    {path:"/",element:<Layout/>, children:[
      {index:true,element:<Home/>},
      {path:"/login",element:<Login/>},
      {path:"/signup",element:<Signup/>},
      {path:"/BroweserMovie" , element:<Browesermovie/>},
      {path:"/moviedetails/:id" , element:<Moviedetails/>}
   
    ]}
    
    ])
  return (
  <>
  <RouterProvider router={router}/>
  </>
  );
}
