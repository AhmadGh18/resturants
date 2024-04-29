import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import { useStateContext } from "./context/ContextProvider";

export default function Chart3() {
  const [tickPlacement, setTickPlacement] = useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = useState("middle");
  const { restaurant } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (restaurant.restaurant) {
      axiosClient
        .get(`/TopOrderdItems/${restaurant.restaurant.id}`)
        .then((res) => {
          setData(
            res.data.map((item) => ({
              title: item.title,
              total_quantity_ordered: parseInt(item.total_quantity_ordered),
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching top ordered items:", error);
        });
    }
  }, [restaurant]);

  return (
    <div className="bg-white">
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "title",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        yAxis={[
          {
            label: "Quantity",
          },
        ]}
        series={[
          {
            dataKey: "total_quantity_ordered",
            label: "Total Quantity Ordered",
          },
        ]}
        height={300}
        tooltip={true} // Enable tooltips
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
        }}
      />
    </div>
  );
}
