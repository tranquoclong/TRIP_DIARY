import React from "react";
import NotificationPopup from "../../../components/NotificationPopup";
import RenderTraveler from "../../../components/RenderTraveler";
import RenderTripItem from "./../../../components/RenderTripItem";

function Feed() {
  return (
    <div className="w_mS w_mT">
      <div className="w_cs" style={{ position: "relative" }}>
        <div className="w_cu">
          <div className="w_cW w_cX">
            <div className="w_i-">
              <label
                className="w_rI w_rT w_ct"
                style={{ marginBottom: "20px" }}
              >
                Popular Travelers
              </label>
            </div>
            <RenderTraveler />
          </div>
        </div>
        <RenderTripItem />
        <NotificationPopup />
      </div>
    </div>
  );
}

export default Feed;
