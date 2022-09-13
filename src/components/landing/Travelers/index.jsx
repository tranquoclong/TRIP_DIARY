import React from "react";
import SectionContainer from "../../profile/SectionContainer";
// import Traveler from "../../Traveller/traveler";
import SectionHeader from "../SectionHeader";
// import styles from "./Travelers.module.css";
import RenderTraveler from "./../../RenderTraveler/index";

const Travelers = (props) => {
  return (
    <div className="w_cs">
      <SectionContainer>
        <SectionHeader>Popular travelers</SectionHeader>
        <div className="w_cW w_cX ">
          <RenderTraveler />
        </div>
      </SectionContainer>
    </div>
  );
};

export default Travelers;
