import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./route-layout";
import { airtimeRouter } from "@features/airtime";
import { ProtectedLayout } from "@/features/auth";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // public routes
      {
        index: true,
        element: <App />,
      },

      {
        element: <ProtectedLayout />,
        children: [...airtimeRouter],
      },
    ],
  },
]);
