import React from "react";
import styles from "./header.module.css";
const Header = (props) => {
  const trips = props.users.trips.map((trips) => trips.visitDays).flat();
  const visit = trips.map((visit) => visit.visitPlaces).flat();
  const photos = visit.map((photos) => photos.images).flat().length;
  return (
    <div style={{ padding: "100px 200px 20px 200px", margin: "0 auto" }}>
      <div>
        <div className={styles["header-cover"]}>
          <div className={styles["header-cover-photo"]}>
            <div className={styles["header-cover-photo-bg"]}></div>
            <img
              alt="coverImage"
              className={styles["header-cover-img"]}
              src={
                `${props.users.coverImageUrl}` === "null"
                  ? "https://wrld-se-prod.b-cdn.net/images/bezfotky.png"
                  : `${props.users.coverImageUrl}`
              }
            />
          </div>
          <div className={styles["header-cover-content"]}>
            <div className={styles["header-cover-content-details"]}>
              <div className={styles["avatar-cover"]}>
                <div className={styles["avatar-inner-cover"]}>
                  <img
                    alt="profile"
                    className={styles["avatar-img"]}
                    src={
                      `${props.users.profileImageUrl}` === "null"
                        ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
                        : `${props.users.profileImageUrl}`
                    }
                  />
                </div>
              </div>
              <div className={styles.name}>
                <div className={styles["user-name"]}>
                  {props.users.username}
                </div>
                <div className={styles["user-url"]}>
                  /{props.users.username}
                </div>
                <div className={styles["row"]}>
                  <br />
                  <br />
                  <br />
                </div>
                <div className={styles["header-second-section"]}>
                  <div className={styles["user-info"]}>
                    <div className={styles["user-repository"]}>
                      <div className={styles["user-repo-item"]}>
                        <span>{props.users.trips.length}</span> trips
                      </div>
                      <div className={styles["user-repo-item"]}>
                        <span>{visit.length}</span> visitPlaces
                      </div>
                      <div className={styles["user-repo-item"]}>
                        <span>{photos}</span> photos
                      </div>
                    </div>
                  </div>
                  <div className={styles["user-description"]}>
                    <p
                      dangerouslySetInnerHTML={{ __html: props.users.aboutMe }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
