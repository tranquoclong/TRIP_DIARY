import React from 'react'
import styles from "./FeatureItem.module.css";

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className={styles["item-outer"]}>
      <div className={styles["item-inner"]}>
        <div className={styles.icon}>
          {icon}
        </div>
        <div className={styles.title}>{title}</div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

export default FeatureItem