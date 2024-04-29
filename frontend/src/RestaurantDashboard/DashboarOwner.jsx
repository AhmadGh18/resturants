import React from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import Stars from "../Stars";
import Chart3 from "../Chart3";
import Chart4 from "../Chart4";
import SideBar from "../SideBar";
import Mainer from "./Mainer";
import TopInfo from "./TopInfo";
import Chart5 from "./Chart5";
import ProfileView from "../MainComponents/ProfileView";

const DashboardOwner = () => {
  return (
    <div className="flex">
      <div className="stat">
        <TopInfo />
        <div>
          <div className="firstCharts">
            <ProfileView />
            {/* <Chart1 /> */}
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
      </div>
    </div>
  );
};

export default DashboardOwner;
