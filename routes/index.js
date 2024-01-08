import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../components/ProdSignup/pages/Login";
import SignupPage from "../components/ProdSignup/pages/Signup";
import Home from "../components/Home/Home";
import ErrorPage from "../components/ErrorPage/errorPage";
import UserProfile from "../components/userProfile/profilePage";

const Routes = () => {
  const { token } = useAuth();


  const routesForPublic = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "profile",
          element: <UserProfile />
        },
        {
          path: "*",
          element: <ErrorPage />
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  
  return <RouterProvider router={router} />;
};

export default Routes;

