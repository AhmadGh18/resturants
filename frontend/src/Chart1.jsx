import { CircularProgress } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import axiosClient from "./axiosClient";
import { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";

export default function TopCitiesChart(props) {
  const { restaurant } = useStateContext();
  const [realcityData, setRealcityData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (restaurant.restaurant) {
      axiosClient
        .get(`/topCustomers/${restaurant.restaurant.id}?limit=5`)
        .then((response) => {
          setRealcityData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching top cities:", error);
          setLoading(false);
        });
    }
  }, [restaurant]);

  return (
    <div className="dataCard categoryCard">
      {loading ? (
        <CircularProgress /> // Show loading indicator while fetching data
      ) : (
        <Doughnut
          data={{
            labels: realcityData.map((data) => data.city),
            datasets: [
              {
                label: "Count",
                data: realcityData.map((data) => data.user_count),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(102, 163, 207, 0.8)",
                  "rgba(189, 134, 157, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(102, 163, 207, 0.8)",
                  "rgba(189, 134, 157, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Top Viewers are from",
              },
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  const label = data.labels[tooltipItem.index];
                  const value = data.datasets[0].data[tooltipItem.index];
                  return `${label}: ${value}`;
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
