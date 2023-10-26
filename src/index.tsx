import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Password from "./pages/Password";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Login />
          },
          {
            path: "/password",
            element: <Password />
          },
          {
            path: "/review",
            element: <Review />
          },
        ]
      }
    ]
  }
]);
