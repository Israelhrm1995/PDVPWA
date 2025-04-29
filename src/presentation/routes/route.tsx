import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SalesPage from "../features/sales/pages/SalesPage";
import NotFoundPage from "../components/error/NotFoundPage";
import LoginPage from "../features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/sales" /> },
      { path: "sales", element: <SalesPage /> },
      { path: "products", element: <div>products</div> },
      { path: "reports", element:  <div>reports</div> },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
