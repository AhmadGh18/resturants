import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";

const Chart2 = () => {
  const { restaurant } = useStateContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/TopOrderdItems/${restaurant.restaurant.id}`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((error) => {
          console.error("Error fetching top ordered items:", error);
        });
    }
  }, [restaurant]);

  return (
    <div className="dataCard customerCard">
      <Bar
        data={{
          labels: items.map((item) => item.title),
          datasets: [
            {
              label: "Total Quantity Ordered",
              data: items.map((item) => item.total_quantity_ordered),
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
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Top Ordered Items",
            },
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
        }}
      />
    </div>
  );
};

export default Chart2;
