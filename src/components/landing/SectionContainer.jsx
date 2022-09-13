import React from 'react';
import styles from "./SectionContainer.module.css";

const SectionContainer = ({ children }) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}

export default SectionContainer;