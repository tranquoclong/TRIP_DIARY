import React from 'react'
import styles from "./SectionHeader.module.css";

const SectionHeader = ({ children }) => {
  return (
    <div className={styles.header}>
      <p>{children}</p>
    </div>
  )
}

export default SectionHeader