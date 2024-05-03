import React, { useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import revenueData from "./data/revenueData.json";
import sourceData from "./data/sourceData.json";
import "./charts.css";
import NewSide from "./NewSide";
import TopInfo from "./TopInfo";
import LineChart from "./LineChart";
import Stars from "../Stars";
import { useStateContext } from "../context/ContextProvider";
import TopCitiesChart from "../Chart1";
import Chart2 from "../PopularItems";
import Revenue from "./Revenue";
const NewDashboard = () => {
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = "black";

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    values: [65, 59, 80, 81, 56, 55, 40],
  };
  const { restaurant } = useStateContext();

  return (
    <div>
      <TopInfo />

      <div className="App">
        <TopCitiesChart />
        <Chart2 />
        <div className="dataCard customerCard">
          <Revenue />
        </div>
        <div className="dataCard categoryCard">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
