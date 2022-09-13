import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "../../profile/Header/header.module.css";
import SectionContainer from "../../profile/SectionContainer";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonProfile = () => {
  return (
    <>
      {Array(1)
        .fill()
        .map((item, index) => (
          <div style={{ paddingTop: "95px" }} key={index}>
            <SectionContainer>
              <div>
                <div className={styles["header-cover"]}>
                  <div className={styles["header-cover-photo"]}>
                    <div className={styles["header-cover-photo-bg"]}></div>
                    <div style={{ background: "#DDD", height: "100%" }}></div>
                  </div>
                  <div className={styles["header-cover-content"]}>
                    <div className={styles["header-cover-content-details"]}>
                      <div className={styles["avatar-cover"]}>
                        <div className={styles["avatar-inner-cover"]}>
                          <Skeleton className={styles["avatar-img"]} />
                        </div>
                      </div>
                      <div className={styles.name}>
                        <div className={styles["user-name"]}>
                          <Skeleton width={250} borderRadius={15} />
                        </div>
                        <div className={styles["user-url"]}>
                          <Skeleton width={100} height={20} borderRadius={10} />
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
                                <span>
                                  <Skeleton
                                    width={100}
                                    height={20}
                                    borderRadius={10}
                                  />
                                </span>
                              </div>
                              <div className={styles["user-repo-item"]}>
                                <span>
                                  <Skeleton
                                    width={100}
                                    height={20}
                                    borderRadius={10}
                                  />
                                </span>
                              </div>
                              <div className={styles["user-repo-item"]}>
                                <span>
                                  <Skeleton
                                    width={100}
                                    height={20}
                                    borderRadius={10}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles["user-description"]}>
                            <p>
                              <Skeleton
                                width={550}
                                height={20}
                                borderRadius={15}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionContainer>
          </div>
        ))}
    </>
  );
};

export default SkeletonProfile;
