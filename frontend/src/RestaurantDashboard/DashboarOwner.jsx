import React from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import Stars from "../Stars";
import Chart3 from "../Chart3";
import Chart4 from "../Chart4";
import SideBar from "../SideBar";
import Mainer from "./Mainer";
import TopInfo from "./TopInfo";

const DashboardOwner = () => {
  return (
    <div className="flex">
      <div className="stat">
        <TopInfo />
        <Mainer />
      </div>
    </div>
  );
};

export default DashboardOwner;
