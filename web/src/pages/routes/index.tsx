import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../login";
import { SignUp } from "../signup";
import { ExpenseControl } from "../expense-control";
import { PageType } from "@/models/enums/pages";
import { MarketControl } from "../market-control";

export const RoutesComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: `${PageType.SignUp}`,
      element: <SignUp />,
    },
    {
      path: `${PageType.ExpenseControl}`,
      element: <ExpenseControl />,
    },
    {
      path: `${PageType.MarketControl}`,
      element: <MarketControl />,
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};
