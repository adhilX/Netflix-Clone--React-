import React from "react";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { ToastContainer } from 'react-toastify';

function App() {
  const route = createBrowserRouter([
    { path: "/", element: <Home /> },

    { path: "/login", element: <Login /> },
    {
      path: "/player/:id", element: <Player />,
    },
    { path: "*", element: <h1 style={{ color: "red" }}>PAGE NOT FOUND</h1> },
  ]);
  return (
    <>
    <ToastContainer theme="dark"/>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
