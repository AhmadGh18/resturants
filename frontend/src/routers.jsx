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
import Map from "./MainComponents/Map";
import RestaurantDashboard from "./components/RestaurantDashboard";
import SideBar from "./components/SideBar";
import Orders from "./components/Orders";

import AskName from "./components/AskName";
import AddLocation from "./AddLocation";
import AddProfile from "./AddProfile";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenu from "./components/RestaurantMenu";

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
        path: "/main",
        element: <Navigate to="/main/homePage" />,
      },
      {
        path: "/main/userPage",
        element: <UserPage />,
      },
      {
        path: "/main/Addrestaurant",
        element: <AddRestaurant />,
        children: [
          {
            path: "/main/Addrestaurant/AddName",
            element: <AskName />,
          },
          {
            path: "/main/Addrestaurant/AddLocation",
            element: <AddLocation />,
          },
          {
            path: "/main/Addrestaurant/Addprofile",
            element: <AddProfile />,
          },
        ],
      },
      {
        path: "/main/restaurantPage",
        element: <RestaurantPage />,
        children: [
          {
            path: "/main/restaurantPage/map",
            element: <Map />,
          },
          {
            path: "/main/restaurantPage/dashboard",
            element: <RestaurantDashboard />,
            children: [
              {
                path: "/main/restaurantPage/dashboard/orders",
                element: <Orders />,
              },
              {
                path: "/main/restaurantPage/dashboard/personalInfo",
                element: <RestaurantInfo />,
              },
              {
                path: "/main/restaurantPage/dashboard/menu",
                element: <RestaurantMenu />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/AskName",
    element: <AskName />,
  },
]);

export default router;
