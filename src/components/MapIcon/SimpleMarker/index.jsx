import React from 'react'
import mIcon from './orangemarker.png'
import styles from './umarker.module.css'


const SimpleMarker = (props) => {
    return (
        <div className={styles["icon_container"]} >
            <img src={mIcon} alt="" className={styles["icon"]} />
        </div>
    )
}

export default SimpleMarker
