import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "../../Traveller/traveler.module.css";
import { Link } from "react-router-dom";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";
// import styled from "styled-components";
// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
// `;

const SkeletonTraveler = () => {
  return (
    <>
      {Array(4)
        .fill()
        .map((item, index) => (
          <div className={styles["container"]} key={index}>
            <div className={styles["inner-container"]}>
              <div className={styles["card"]}>
                <div className={styles["cover-photo"]}></div>
                <div className={styles["content"]}>
                  <div className={styles["avt-container"]}>
                    <div className={styles["avt-inner-container"]}>
                      <Skeleton circle={true} height={72} width={72} />
                    </div>
                  </div>
                  <Link to="/" className={styles["name-container"]}>
                    <span className={styles["name"]}>
                      <Skeleton height={30} width={`30%`} borderRadius={13} />
                    </span>
                  </Link>
                  <div className={styles["description-container"]}>
                    <span className={styles["description"]}>
                      <Skeleton height={20} width={`50%`} borderRadius={10} />
                    </span>
                  </div>
                  <div className={styles["info-nav-container"]}>
                    <div className={styles["info-item"]}>
                      <div className={styles["item-icon"]}>
                        <FaSuitcase />
                      </div>
                      <div className={styles["item-content"]}>
                        <label className={styles["number"]}>0</label>
                        Trips
                      </div>
                    </div>
                    <div className={styles["info-item"]}>
                      <div className={styles["item-icon"]}>
                        <BsFillCameraFill />
                      </div>
                      <div className={styles["item-content"]}>
                        <label className={styles["number"]}>0</label>
                        Photos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonTraveler;
