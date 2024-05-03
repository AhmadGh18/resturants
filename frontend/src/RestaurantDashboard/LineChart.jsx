import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const ProfileViewsChart = () => {
  const [months, setMonths] = useState([]);
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { restaurant } = useStateContext();

  useEffect(() => {
    if (restaurant.restaurant) {
      setLoading(true);
      axiosClient
        .get(`/profileviewOfRestaurant/${restaurant.restaurant.id}`)
        .then((response) => {
          const monthsData = response.data.map((item) => item.month);
          const viewsData = response.data.map((item) => item.total);
          setMonths(monthsData);
          setViews(viewsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile views:", error);
          setLoading(false);
        });
    }
  }, [restaurant]);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Profile Views",
        data: views,
        fill: false,
        borderColor: "#007bff", // Blue color
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Profile Views Per Month",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Views",
        },
      },
    },
  };

  return (
    <div className="w-100 h-100">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProfileViewsChart;
