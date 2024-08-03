import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../login";
import { SignUp } from "../signup";
import { ExpenseControl } from "../expense-control";

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
    {
      path: "/expense",
      element: <ExpenseControl />,
    },
  ]);
  return <RouterProvider router={router} />;
};
