import React from "react";
import {
  Fa500Px,
  FaAcquisitionsIncorporated,
  FaHouseDamage,
  FaOutdent,
  FaYinYang,
} from "react-icons/fa";

const TopInfo = () => {
  return (
    <div className="analholder">
      <div className="singleAnalytic bg-white">
        <div className="iconhold">
          <FaHouseDamage />
        </div>
        <span> AllItems</span>
      </div>

      <div className="singleAnalytic bg-white">
        <div className="iconhold">
          <FaYinYang />
        </div>
        <span> AllItems</span>
      </div>
      <div className="singleAnalytic bg-white">
        <div className="iconhold">
          <Fa500Px />
        </div>
        <span> All Customer</span>
      </div>
      <div className="singleAnalytic bg-white">
        <div className="iconhold">
          <FaAcquisitionsIncorporated />
        </div>
        <span>Profile views</span>
      </div>
    </div>
  );
};

export default TopInfo;
