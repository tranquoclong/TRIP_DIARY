import React from "react";
import SectionContainer from "../SectionContainer";
import SectionHeader from "../SectionHeader";
import styles from "./Popular.module.css";
// import TripItem from "../../TripItem/TripItem";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import RenderTripItem from "./../../RenderTripItem/index";

const Popular = () => {
  return (
    <div className="w_cs">
      <SectionContainer>
        <SectionHeader>Peek into some saved stories</SectionHeader>
        <div className={styles["trip-container"]}>
          <div className={styles["trip-items"]}>
            <RenderTripItem />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Popular;
