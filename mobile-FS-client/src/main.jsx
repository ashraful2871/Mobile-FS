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
import CashIn from "./transection/CashIn";
import DashBoard from "./layout/DashBoard";
import AllUsers from "./dashboard/user/AllUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViewAllUserTransaction from "./dashboard/user/ViewAllUserTransaction";
import Transaction from "./dashboard/agent/Transaction";
import UserTransaction from "./dashboard/user/UserTransaction";
import AdminRoute from "./dashboard/admin/AdminRoute";
import AgentRoute from "./dashboard/agent/AgentRoute";
import UserRoute from "./dashboard/user/UserRoute";
import AgentApproval from "./dashboard/admin/AgentApproval";
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

      //user menu
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
      {
        path: "/cash-in",
        element: (
          <Privet>
            <CashIn></CashIn>
          </Privet>
        ),
      },
    ],
  },

  //dashboard

  {
    path: "/dashboard",
    element: (
      <Privet>
        <DashBoard></DashBoard>
      </Privet>
    ),
    children: [
      //admin menu
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "view-user-transaction/:id",
        element: (
          <AdminRoute>
            <ViewAllUserTransaction></ViewAllUserTransaction>
          </AdminRoute>
        ),
      },
      {
        path: "request-approval",
        element: (
          <AdminRoute>
            <AgentApproval></AgentApproval>
          </AdminRoute>
        ),
      },
      //agent menu
      {
        path: "agent-transaction",
        element: (
          <AgentRoute>
            <Transaction></Transaction>
          </AgentRoute>
        ),
      },

      //user route
      {
        path: "user-transaction",
        element: (
          <UserRoute>
            <UserTransaction></UserTransaction>
          </UserRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
