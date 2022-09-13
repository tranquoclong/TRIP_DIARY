import React from "react";
import styles from "./profileUser.module.css";
function ProfileUser({ users }) {
  const trips = users.trips.map((trips) => trips.visitDays).flat();
  const visit = trips.map((visit) => visit.visitPlaces).flat();
  const photos = visit.map((photos) => photos.images).flat().length;
  return (
    <div>
      <img
        className={styles.profile_card}
        src={
          `${users.coverImageUrl}` === "null"
            ? "https://wrld-se-prod.b-cdn.net/images/bezfotky.png"
            : `${users.coverImageUrl}`
        }
        alt=""
      />
      <div className={styles.profile_info}>
        <img
          className={styles.profile_pic}
          src={
            `${users.profileImageUrl}` === "null"
              ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg"
              : `${users.profileImageUrl}`
          }
          alt=""
        />
        <div className={styles.Container_info}>
          <h2>
            {users.username}
            <span>/{users.username}</span>
          </h2>
          <div className={styles.alls}>
            <div className={styles.all}>
              <span>{users.trips.length}</span> trips
            </div>
            <div className={styles.all}>
              <span>{visit.length}</span> visitPlaces
            </div>
            <div className={styles.all}>
              <span>{photos}</span> photos
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: users.aboutMe }}></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
