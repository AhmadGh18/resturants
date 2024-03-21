import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import RestaurantPage from "./MainComponents/RestaurantPage";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Default from "./MainComponents/Default";
import Guest from "./MainComponents/Guest";
import UserPage from "./MainComponents/UserPage";
import RestaurantLogin from "./components/RestaurantLogin";
import AddRestaurant from "./components/AddRestaurant";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/restaurant",
    element: <RestaurantPage />,
  },
  {
    path: "/newUser",
    element: <Guest />,
    children: [
      {
        path: "/newUser",
        element: <Navigate to="/newUser/login" />,
      },
      {
        path: "/newUser/login",
        element: <LoginPage />,
      },
      {
        path: "/newUser/signup",
        element: <Signup />,
      },
      {
        path: "/newUser/RestaurantLogin",
        element: <RestaurantLogin />,
      },
    ],
  },
  {
    path: "/main",
    element: <Default />,
    children: [
      {
        path: "/main/userPage",
        element: <UserPage />,
      },
      {
        path: "/main/restaurantPage",
        element: <RestaurantPage />,
      },

      {
        path: "/main/AddRestaurant",
        element: <AddRestaurant />,
      },
    ],
  },
]);

export default router;
