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

import Orders from "./components/Orders";
import "./index.css";
import AskName from "./components/AskName";
import AddLocation from "./AddLocation";
import AddProfile from "./AddProfile";

import AddItem from "./components/AddItem";
import Analytic from "./Analytics";
import AllRestaurants from "./MainComponents/AllRestaurants";
import AllItems from "./components/AllItems";
import SingleItem from "./SingleItem";
import SingleRestaurant from "./SingleRestaurant";
import Itemss from "./Itemss";
import NearbyPlace from "./NearbyPlace";
import TestSwiper from "./SimilarSwiper";
import ItemCard from "./MainComponents/ItemCard";
import MeetingCard from "./components/RestaurantItemsCard";
import SingleProductDetails from "./singe/SingleProductDetails";
import Checkout from "./Checkout";
import AddLocationAndSubmit from "./AddLocationAndSubmit";
import AllCartItems from "./AllCartItems";
import DashboarOwner from "./RestaurantDashboard/DashboarOwner";

import PersonalInfo from "./PersonalInfo";
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
            path: "/main/restaurantPage",
            element: <Navigate to="/main/restaurantPage/dashboard" />,
          },
          {
            path: "/main/restaurantPage/dashboard",
            element: <RestaurantDashboard />,
            children: [
              {
                path: "/main/restaurantPage/dashboard/additem",
                element: <AddItem />,
              },
              {
                path: "/main/restaurantPage/dashboard",
                element: <Analytic />,
              },
              // {
              //   path: "/main/restaurantPage/dashboard/ManageItems",
              //   element: <ManageItem />,
              // },
              {
                path: "/main/restaurantPage/dashboard/PersonalInfo",
                element: <PersonalInfo />,
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
  {
    path: "/AllRestaurants",
    element: <AllRestaurants />,
  },
  {
    path: "/AllItems",
    element: <AllItems />,
  },
  {
    path: "/singleitem/:id",
    element: <SingleItem />,
  },
  {
    path: "/singleRestaurant/:restaurantId",
    element: <SingleRestaurant />,
  },
  {
    path: "/Itemss",
    element: <Itemss />,
  },
  {
    path: "/nearby",
    element: <NearbyPlace />,
  },
  {
    path: "/TestSwiper",
    element: <TestSwiper />,
  },
  {
    path: "/SingleProductDetails/:id",
    element: <SingleProductDetails />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/addLocationAndSubmit",
    element: <AddLocationAndSubmit />,
  },
  {
    path: "/AllCartItems",
    element: <AllCartItems />,
  },
  {
    path: "/PersonalInfo",
    element: <PersonalInfo />,
  },
]);

export default router;
