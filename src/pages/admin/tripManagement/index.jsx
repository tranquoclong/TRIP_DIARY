import React, { useState } from "react";
import classNames from "classnames";
import styles from "../Dashboard/dashboard.module.css";
import ImagesForTrip from "./imagesForTrip";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import AllTrip from "./allTrip";

function TripManagement() {
  const [hidden, setHidden] = useState(false);
  const [trip, setTrip] = useState(null);
  return (
    <div>
      <div
        className={classNames(
          `${styles.formLogin}`,
          hidden && `${styles.formLoginHidden}`
        )}
      >
        <AllTrip hidden={hidden} setHidden={setHidden} setTrip={setTrip} />
      </div>
      <div
        className={classNames(
          `${styles.formLoginHidden}`,
          hidden && `${styles.formLoginEmail}`
        )}
      >
        {trip && (
          <ImagesForTrip hidden={hidden} setHidden={setHidden} trip={trip} />
        )}
      </div>
      <NotificationContainer />
    </div>
  );
}

export default TripManagement;
