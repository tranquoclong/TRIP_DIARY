import React from "react";
import { Link } from "react-router-dom";
import styles from "./TripItem.module.css";
const TripItem = (props) => {
  const place = props.listTrip.visitDays
    .map((visit) => visit.visitPlaces)
    .flat();
  const photo = place.map((photo) => photo.images).flat();
  return (
    <div className={styles.outer}>
      <div className={styles["item-image"]}>
        <img
          alt="thumbnailUrl"
          src={
            props.listTrip.thumbnailUrl == null
              ? `https://source.unsplash.com/random/?wallpaper,landscape,${props.listTrip.name}`
              : props.listTrip.thumbnailUrl
          }
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* <div className={styles["list-flag"]} width="144" height="32">
            <div className={styles.flag}>
              <img
                src={
                  props.listTrip.flag == null
                    ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                    : props.listTrip.flag
                }
                alt="countryFlags/VN"
                className="w_fu w_fB"
              />
            </div>
          </div> */}
        </div>
        <div className={styles.bottom}>
          <Link
            to={`/trip/${props.listTrip.id}`}
            className={styles["trip-name"]}
          >
            <div>
              <span>{props.listTrip.name}</span>
            </div>
          </Link>
          <br />
          <Link
            to={`profile/${props.listTrip.owner}` || "/"}
            className={styles["trip-name"]}
            style={{ fontSize: "1rem", fontWeight: "400" }}
          >
            <div>
              <span>{props.listTrip.owner}</span>
            </div>
          </Link>
          <div className={styles["destination-info"]}>
            <span>{props.listTrip.visitDays.length} days</span>
            <span>{photo.length} photos</span>
            <span>{place.length} places</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
