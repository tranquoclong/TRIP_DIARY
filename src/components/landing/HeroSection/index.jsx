import styles from "./HeroSection.module.css";
import React from 'react'
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className={styles["hero-section"]}>
      <div>
        <h1 className={styles.title}>The best product <br /> to save your trip</h1>
        <p className={styles.subtitle}>
          Planning trips - Save trips - Edit trips
        </p>

        <Link to="/signUp" className={styles.button}>
          <div>
            Join us now
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection