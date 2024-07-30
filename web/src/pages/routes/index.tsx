import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../login";
import { SignUp } from "../signup";

export const RoutesComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
};
