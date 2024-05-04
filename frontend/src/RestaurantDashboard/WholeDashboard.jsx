import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Stars from "../Stars";
import TopCitiesChart from "../Chart1";
import Chart2 from "../PopularItems";
import Chart3 from "../Chart3";
import Chart4 from "../Chart4";
import Chart5 from "./Revenue";
import ProfileView from "../MainComponents/ProfileView";
import TopInfo from "./TopInfo";
import { useStateContext } from "../context/ContextProvider";

const WholeDashboard = () => {
  const { restaurant } = useStateContext();

  return <div></div>;
};

export default WholeDashboard;
