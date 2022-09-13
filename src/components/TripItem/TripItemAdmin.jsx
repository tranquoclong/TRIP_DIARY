import React from "react";
import { Link } from "react-router-dom";
import styles from "./TripItem.module.css";
import { ImBin } from "react-icons/im";
const TripItemAdmin = (props) => {
  const place = props.listTrip.visitDays
    .map((visit) => visit.visitPlaces)
    .flat();
  const photo = place.map((photo) => photo.images).flat();
  const onClick = (id) => {
    props.setTrip(id);
    props.setHidden(!props.hidden);
  };
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
        <div className={styles.top} style={{ justifyContent: "flex-end" }}>
          <button
            style={{ display: "contents", justifyContent: "flex-end" }}
            onClick={() => props.onDeleteTrip(props.listTrip.id)}
          >
            <ImBin color="#F44336" />
          </button>
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
          <div
            className={styles["destination-info"]}
            style={{ justifyContent: "space-between" }}
          >
            <div className={styles["destination-info"]}>
              <span>{props.listTrip.visitDays.length} days</span>
              <span>{photo.length} photos</span>
              <span>{place.length} places</span>
            </div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onClick(props.listTrip.id)}
            >
              All Images
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItemAdmin;
