import React from "react";
import styles from "./future.module.css";
import { Link } from "react-router-dom";
// import TripList from "../TripList";
import SectionContainer from "../SectionContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "../../Grid/Grid";
import { useEffect, useState } from "react";
import TripItem from "../../TripItem/TripItem";

const FutureTrips = ({ trips }) => {
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);

  const [showed, setShowed] = useState(false);

  useEffect(() => {
    setShowed(false);
  }, [trips]);

  const onShowList = () => {
    setShowed((prev) => !prev);
  };

  const showedList = !showed ? [...trips].slice(0, 3) : [...trips];

  return (
    <div>
      <SectionContainer>
        <div className={styles["trips-title"]}>
          <div className={styles["title-wrapper"]}>
            <label className={styles.title}>My Next Trips</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {user && username === user.username ? (
                <Link to="/trip">
                  <button className={styles["add-btn"]}>
                    <div className={styles["add-btn-title"]}>
                      <span className={["add-btn-text"]}>
                        Plan Another Trip
                      </span>
                    </div>
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {
                trips && trips.length !== 0 && (
                  <button className={styles["add-btn"]} onClick={onShowList}>
                    <div className={styles["add-btn-title"]}>
                      {showed ? (
                        <span className={["add-btn-text"]}>Collapse</span>
                      ) : (
                        <span className={["add-btn-text"]}>Show all</span>
                      )}
                    </div>
                  </button>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles["trips-container"]}>
          {trips && trips.length !== 0 ? (
            <Grid>
              {showedList.map((trip) => (
                <TripItem listTrip={trip} key={trip.id} />
              ))}
            </Grid>
          ) : (
            "THERE IS NO TRIP"
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default FutureTrips;
