import React from "react";
import styles from "./Trips.module.css";
import RenderTripNoTitle from "../../RenderTripNoTitle";

const Trips = () => {
    return (
        <div className="w_cs" >
            <div className={styles["trip-container"]}>
                <div className={styles["trip-items"]}>
                    <RenderTripNoTitle />
                </div>
            </div>
        </div>
    );
};
export default Trips;