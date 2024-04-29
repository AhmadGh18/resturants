import React from "react";
import SideBar from "../SideBar";
import Stars from "../Stars";
import TopCitiesChart from "../Chart1";
import Chart2 from "../Chart2";
import Chart3 from "../Chart3";
import Chart4 from "../Chart4";
import Chart5 from "./Chart5";
import ProfileView from "../MainComponents/ProfileView";
import TopInfo from "./TopInfo";

const WholeDashboard = () => {
  return (
    <div className="flex">
      <div className="stat">
        <TopInfo />
        <div>
          <div className="firstCharts">
            <ProfileView />
            <TopCitiesChart />
          </div>

          <div></div>
          <div className="m-8">
            <Chart3 />
          </div>
          <div className="flex items-center justify-between ml-10">
            <Stars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeDashboard;
