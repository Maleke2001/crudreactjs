import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import EmpCreate from "./components/EmpCreate";
import EmpDetails from "./EmpDetails";
import EmpEdit from "./components/EmpEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create",
    element: <EmpCreate />,
  },
  {
    path: "details/:empid",
    element: <EmpDetails />,
  },
  {
    path: "edit/:empid",
    element: <EmpEdit />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
