import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routesGenerator from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App></App>,
    children: routesGenerator(studentPaths),
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