import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

export default function Revenue() {
  const [rev, setRev] = useState(null);
  const { restaurant } = useStateContext();

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/revenuePerMonth/${restaurant.restaurant.id}`)
        .then((res) => {
          setRev(res.data);
        });
    }
  }, [restaurant.restaurant]);

  // Prepare data for the Line chart
  const chartData = {
    labels: rev ? rev.map((item) => item.month) : [],
    datasets: [
      {
        label: "Monthly Revenue",
        data: rev ? rev.map((item) => item.total_revenue) : [],
        fill: false,
        borderColor: "#FF3030",
      },
    ],
  };

  return (
    <div className="w-100 h-100">
      {rev && (
        <Line
          data={chartData}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Monthly Revenue",
              },
            },
          }}
        />
      )}
    </div>
  );
}
