import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routesGenerator from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App></App>
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App></App>
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App></App>
      </ProtectedRoute>
    ),
    children: routesGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <App></App>,
  },
]);

export default router;
