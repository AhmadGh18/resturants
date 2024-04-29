import React from "react";
import UserNav from "./components/UserNav";
import { useStateContext } from "./context/ContextProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Myhome = () => {
  const { User, token } = useStateContext();
  const nav = useNavigate();
  if (!token) {
    nav("/newUser/login");
  }
  return (
    <div>
      <UserNav />

      <div className="w-100 flex justify-around bg-blue-400 text-white h-10 align-items-center">
        <div className="cursor-pointer">
          <Link className="text-lg" to="/myhome/savedrestaurant">
            Saved Restaurants
          </Link>
        </div>
        <Link className="text-lg" to="/myhome/savedItems">
          Saved Items
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Myhome;
