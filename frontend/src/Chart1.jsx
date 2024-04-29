import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./axiosClient";
import { CircularProgress } from "@mui/material";

export default function TopCitiesChart() {
  const { restaurant } = useStateContext();
  const [realcityData, setRealcityData] = useState([]);
  const [Loading, setLoading] = useState(false);
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
        });
    }
  }, [restaurant]);

  return (
    <div>
      {Loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <PieChart
          series={[
            {
              data: realcityData.map((city) => ({
                id: city.city,
                value: city.user_count,
                label: city.city,
              })),
            },
          ]}
          width={400}
          height={200}
        />
      )}
    </div>
  );
}
