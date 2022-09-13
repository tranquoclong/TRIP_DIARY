import React from 'react'
import mIcon from './greenmarker.png'
import styles from './omarker.module.css'

const  OrderedMarker = (props) => {
    return (
        <div className={styles["icon_container"]} >
            <img src={mIcon} alt="" className={styles["icon"]} />
            <p className={styles["icon_order"]}>{props.order}</p>
        </div>
    )
}

export default OrderedMarker