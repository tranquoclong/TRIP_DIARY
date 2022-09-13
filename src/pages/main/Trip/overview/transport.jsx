import React from "react";
import {
  FaPlane,
  FaMotorcycle,
  FaBicycle,
  FaBusAlt,
  FaTrain,
  FaWalking,
} from "react-icons/fa";
import { RiShipFill } from "react-icons/ri";
import { IoCarSport } from "react-icons/io5";
import styles from "./overview.module.css";
const Transport = ({ transportation, onChangeTransportation }) => {
  const handleClickActiveTab = (e) => {
    onChangeTransportation(e);
  };

  return (
    <>
      <label className="w_rI w_rS w_UW">Transportation</label>
      <div>
        <div
          style={{
            background: "hsla(0, 0%, 4%, .15)",
            margin: "0px auto",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
            // maxWidth: ""
          }}
        >
          <div
            className={`${styles.item} ${transportation === "plane" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("plane")}
          >
            <FaPlane />
          </div>
          <div
            className={`${styles.item} ${transportation === "car" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("car")}
          >
            <IoCarSport />
          </div>
          <div
            className={`${styles.item} ${transportation === "bus" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("bus")}
          >
            <FaBusAlt />
          </div>
          <div
            className={`${styles.item} ${transportation === "train" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("train")}
          >
            <FaTrain />
          </div>
          <div
            className={`${styles.item} ${transportation === "ship" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("ship")}
          >
            <RiShipFill />
          </div>
          <div
            className={`${styles.item} ${transportation === "motorbike" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("motorbike")}
          >
            <FaMotorcycle />
          </div>
          <div
            className={`${styles.item} ${transportation === "bike" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("bike")}
          >
            <FaBicycle />
          </div>
          <div
            className={`${styles.item} ${transportation === "on_walk" ? `${styles.isActive}` : ""
              }`}
            onClick={() => handleClickActiveTab("on_walk")}
          >
            <FaWalking />
          </div>
        </div>
      </div>
      <div />
    </>
  );
};

export default Transport;
