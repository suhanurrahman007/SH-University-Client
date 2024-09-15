import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: adminRoutes,
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: adminRoutes,
  },
  {
    path: "/student",
    element: <App></App>,
    children: adminRoutes,
  },
  {
    path: "/login",
    element: <App></App>,
  },
  {
    path: "/register",
    element: <App></App>,
  },
]);

export default router;