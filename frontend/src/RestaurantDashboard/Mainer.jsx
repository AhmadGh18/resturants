import React from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import Chart4 from "../Chart4";
import Chart3 from "../Chart3";
import SideBar from "../SideBar";
import Stars from "../Stars";
import Table from "./Table";
import Chart5 from "./Chart5";
import ProfileView from "../MainComponents/ProfileView";

const Mainer = () => {
  return (
    <div>
      <div className="firstCharts">
        <Chart2 />
        <Chart1 />
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
      </div>
      <ProfileView />
    </div>
  );
};

export default Mainer;
