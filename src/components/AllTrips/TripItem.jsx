import React from "react";
import { Link } from "react-router-dom";
import styles from "./TripItem.module.css";
const TripItem = (props) => {
  //pass info to props

  return (
    <div className={styles.outer}>
      <div className={styles["item-image"]}>
        <img
          alt={props.tripName}
          src={props.thumbnail}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles["list-flag"]} width="144" height="32">
            <div className={styles.flag}>
              <img
                //src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png"
                src={props.flag}
                alt="countryFlags/VN"
                className="w_fu w_fB"
              />
            </div>
          </div>
          <div title={props.tripName} className={styles["profile-image"]}>
            <Link to="/user" className="w_AP w_kj w_kq">
              <img
                className=""
                alt="profile"
                //src="https://wrld-wa-ec1-prod.b-cdn.net/accounts/26b82d3a4f4fca22b1ef4a3e1aaac37a/profile/56284ea742762a1.77627864.jpg?width=640&amp;height=640"
                src={props.profilePhoto}
              />
            </Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <Link to="/trip/draft?id=348410" className={styles["destination-name"]}>
            <div className="">
              <span>{props.tripName}</span>
            </div>
          </Link>
          <div className={styles["destination-info"]}>
            <span>{props.numOfDates} days</span>
            <span>{props.numOfPlaces} Place</span>
            <span>{props.numOfPhotos} Photos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
