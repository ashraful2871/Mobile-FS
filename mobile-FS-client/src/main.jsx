import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import SendMoney from "./transection/SendMoney";
import CashOut from "./transection/CashOut";
import Privet from "./provider/privet/Privet";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/send-money",
        element: (
          <Privet>
            <SendMoney></SendMoney>
          </Privet>
        ),
      },
      {
        path: "/cash-out",
        element: (
          <Privet>
            <CashOut></CashOut>
          </Privet>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>
);
