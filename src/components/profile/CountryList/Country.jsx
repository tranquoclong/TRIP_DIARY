import React from 'react'
import styles from './Country.module.css'

const Country = (props) => {
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles["img-box"]}>
                    <img src={props.img} alt="country" className={styles.img}/>
                </div>
                <div className={styles.info}>
                    <div className={styles.name}><span>{props.name}</span></div>
                    <span className={styles["num-of-trips"]}>Trips: {props.numOfTrips}</span>
                </div>
            </div>
        </div>
    )
}

export default Country