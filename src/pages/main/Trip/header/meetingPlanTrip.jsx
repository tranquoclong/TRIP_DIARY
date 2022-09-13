import React from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
// import styles from "./headerTrip.module.css";
const MeetingPlanTrip = ({ tripId, invitedUsers }) => {
  const onClick = (url) => {
    const urls = window.location.href + "/meeting/" + tripId;
    window.open(urls, "_blank");
  };
  return (
    <div style={{ marginRight: "16px" }}>
      <div className="w_ki">
        <button className="w_kj" onClick={onClick}>
          <div className="w_WS" style={{ marginBottom: "3px" }}>
            <div className="w_WV w_WX" style={{ color: "#fff" }}>
              <BsFillCameraVideoFill />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MeetingPlanTrip;
