import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";
import Mainer from "./RestaurantDashboard/Mainer";
import TopInfo from "./RestaurantDashboard/TopInfo";
import Chart2 from "./Chart2";
import ProfileView from "./MainComponents/ProfileView";
import Stars from "./Stars";
import Chart5 from "./RestaurantDashboard/Chart5";
import TopCitiesChart from "./Chart1";
import Chart3 from "./Chart3";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { CircularProgress } from "@mui/material";

const AdminPage = () => {
  const { User, setUser, token, restaurant } = useStateContext();
  const nav = useNavigate();
  if (!token) {
    nav("/newUser/login");
  }

  // useEffect(() => {
  //   axiosClient
  //     .get("/user")
  //     .then((response) => {
  //       console.log(response.data);
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  useEffect(() => {
    if (User.has_restaurant == 0) {
      return nav("/newUser/login");
    }
  }, []);

  const [months, setMonths] = useState([]);
  const [views, setViews] = useState([]);
  const [loading, setLoagin] = useState(true);
  useEffect(() => {
    if (restaurant.restaurant) {
      setLoagin(true);
      axiosClient
        .get(`/profileviewOfRestaurant/${restaurant.restaurant.id}`)
        .then((response) => {
          // Extract only the month part from the date string
          const monthsData = response.data.map((item) => item.month);
          const viewsData = response.data.map((item) => item.total);
          console.log(response);
          setMonths(monthsData);
          setViews(viewsData);
          setLoagin(false);
        })
        .catch((error) => {
          console.error("Error fetching profile views:", error);
        });
    }
  }, [restaurant]);

  return (
    <div>
      {/* <TopInfo />
      <div>
        <div className="firstCharts">
          <Chart2 />
          <TopCitiesChart />
        </div>

        <div>
          <ProfileView />
        </div>
        <div className="m-8">
          <Chart3 />
        </div>
        <div className="flex items-center justify-between">
          <Stars />
          <Chart5 />
        </div> */}
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <LineChart
          width={500}
          height={300}
          series={[
            {
              data: views,
              label: "Profile Views",
              area: true,
              showMark: false,
            },
          ]}
          xAxis={[{ scaleType: "point", data: months }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
          }}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default AdminPage;
