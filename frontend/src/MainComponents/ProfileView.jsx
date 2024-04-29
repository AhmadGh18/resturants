import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import { CircularProgress } from "@mui/material";

export default function ProfileView() {
  const { restaurant } = useStateContext();
  const [months, setMonths] = useState([]);
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true); // Corrected spelling
  useEffect(() => {
    if (restaurant.restaurant) {
      setLoading(true);
      axiosClient
        .get(`/profileviewOfRestaurant/${restaurant.restaurant.id}`)
        .then((response) => {
          // Extract only the month part from the date string
          const monthsData = response.data.map((item) => item.month);
          const viewsData = response.data.map((item) => item.total);
          // Update state with the extracted data
          setMonths(monthsData);
          setViews(viewsData);
          setLoading(false); // Corrected spelling
        })
        .catch((error) => {
          console.error("Error fetching profile views:", error);
          setLoading(false); // Corrected spelling
        });
    }
  }, [restaurant]);

  return (
    <div style={{ width: 500, height: 300, position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "300px",
            width: "500px",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
      {!loading && (
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
    </div>
  );
}
