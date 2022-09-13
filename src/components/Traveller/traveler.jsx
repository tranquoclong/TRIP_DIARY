import React from "react";
import styles from "./traveler.module.css";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Traveler = (props) => {
  const trips = props.listUser.trips.map((trips) => trips.visitDays).flat();
  const visit = trips.map((visit) => visit.visitPlaces).flat();
  const photos = visit.map((photos) => photos.images).flat().length;
  return (
    <div className={styles["container"]}>
      <div className={styles["inner-container"]}>
        <div className={styles["card"]}>
          <div className={styles["cover-photo"]}>
            <img
              src={
                props.listUser.coverImageUrl === "" ||
                props.listUser.coverImageUrl === null
                  ? "https://wrld-se-prod.b-cdn.net/images/bezfotky.png"
                  : props.listUser.coverImageUrl
              }
              alt=""
              className={styles["cover-photo-img"]}
            />
          </div>
          <div className={styles["content"]}>
            <div className={styles["avt-container"]}>
              <div className={styles["avt-inner-container"]}>
                <img
                  className={styles["avt"]}
                  alt="profile"
                  src={
                    props.listUser.profileImageUrl === "" ||
                    props.listUser.profileImageUrl === null
                      ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                      : props.listUser.profileImageUrl
                  }
                />
              </div>
            </div>
            <Link
              to={`/profile/${props.listUser.username}`}
              className={styles["name-container"]}
            >
              <span className={styles["name"]}>{props.listUser.username}</span>
            </Link>
            <div className={styles["description-container"]}>
              <span className={styles["description"]}>{props.country}</span>
            </div>
            <div className={styles["info-nav-container"]}>
              <div className={styles["info-item"]}>
                <div className={styles["item-icon"]}>
                  <FaSuitcase />
                </div>
                <div className={styles["item-content"]}>
                  <label className={styles["number"]}>
                    {props.listUser.trips.length}
                  </label>
                  Trips
                </div>
              </div>
              <div className={styles["info-item"]}>
                <div className={styles["item-icon"]}>
                  <BsFillCameraFill />
                </div>
                <div className={styles["item-content"]}>
                  <label className={styles["number"]}>{photos}</label>
                  Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traveler;
