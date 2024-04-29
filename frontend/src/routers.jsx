import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import RestaurantPage from "./MainComponents/RestaurantPage";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Default from "./MainComponents/Default";
import Guest from "./MainComponents/Guest";
import RestaurantLogin from "./components/RestaurantLogin";
import AddRestaurant from "./components/AddRestaurant";
import Map from "./MainComponents/Map";
import "./index.css";
import AskName from "./components/AskName";
import AddLocation from "./AddLocation";
import AddProfile from "./AddProfile";

import AddItem from "./components/AddItem";
import AllRestaurants from "./MainComponents/AllRestaurants";
import AllItems from "./components/AllItems";
import SingleItem from "./SingleItem";
import SingleRestaurant from "./SingleRestaurant";
import Itemss from "./Itemss";
import NearbyPlace from "./NearbyPlace";
import TestSwiper from "./SimilarSwiper";

import SingleProductDetails from "./singe/SingleProductDetails";
import Checkout from "./Checkout";
import AddLocationAndSubmit from "./AddLocationAndSubmit";
import AllCartItems from "./AllCartItems";

import PersonalInfo from "./PersonalInfo";
import Myhome from "./Myhome";
import UserSavedRestaurant from "./UserSavedRestaurant";
import UserSavedItems from "./UserSavedItems";
import TopCitiesChart from "./Chart1";
import Alone from "./Alone";
import SimpleAreaChart from "./MainComponents/ProfileView";
import WholeDashboard from "./RestaurantDashboard/WholeDashboard";
import BestPlace from "./BestPlace";
import ManageItem from "./ManageItem";
import ItemOnwer from "./ItemOnwer";
import RestaurantItemsCard from "./components/RestaurantItemsCard";
import Orders from "./Orders";
import SingleOrder from "./SingleOrder";
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
      // {
      //   path: "/main/userPage",
      //   element: <UserPage />,
      // },
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
            path: "/main/restaurantPage/dashboard",
            element: <WholeDashboard />,
          },
          {
            path: "/main/restaurantPage/dashboard/PersonalInfo",
            element: <PersonalInfo />,
          },
          {
            path: "/main/restaurantPage/dashboard/BestPlace",
            element: <BestPlace />,
          },
          {
            path: "/main/restaurantPage/dashboard/additem",
            element: <AddItem />,
          },
          {
            path: "/main/restaurantPage/dashboard/manageItem",
            element: <ManageItem />,
          },
          {
            path: "/main/restaurantPage/dashboard/singleItemToedit/:id",
            element: <ItemOnwer />,
          },
          {
            path: "/main/restaurantPage/dashboard/Orders",
            element: <Orders />,
          },
          {
            path: "/main/restaurantPage/dashboard/Orders/singleorder/:id",
            element: <SingleOrder />,
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
    path: "/myhome",
    element: <Myhome />,
    children: [
      {
        path: "/myhome",
        element: <Navigate to="/myhome/savedrestaurant" />,
      },
      {
        path: "/myhome/savedrestaurant",
        element: <UserSavedRestaurant />,
      },
      {
        path: "/myhome/savedItems",
        element: <UserSavedItems />,
      },
    ],
  },
  {
    path: "/TopCitiesChart",
    element: <TopCitiesChart />,
  },
  {
    path: "/Alone",
    element: <Alone />,
    children: [
      {
        path: "/Alone/chart",
        element: <SimpleAreaChart />,
      },
    ],
  },
  {
    path: "/RestaurantItemsCard",
    element: <RestaurantItemsCard />,
  },
]);

export default router;
