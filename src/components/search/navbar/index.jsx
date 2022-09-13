import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BiTrip } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import styles from './nav.module.css'

const Nav = () => {
    return (
        <div>
            <div className={styles["nav-container"]}>
                <div className={styles["nav"]}>
                    <div className={styles["nav-content"]}>
                        <div className={styles["nav-btn-selected"]}>
                            <div className={styles["btn-icon"]}>
                                <AiOutlineUnorderedList className={styles["btn-icon"]}/>
                            </div>
                            <div className={styles["btn-title"]}>
                                <span> All</span>
                            </div>
                        </div>
                        <div className={styles["nav-btn"]}>
                            <div className={styles["btn-icon"]}>
                                <BiTrip className={styles["btn-icon"]}/>
                            </div>
                            <div className={styles["btn-title"]}>
                                <span> Trips</span>
                            </div>
                        </div>
                        <div className={styles["nav-btn"]}>
                            <div className={styles["btn-icon"]}>
                                <BsPerson className={styles["btn-icon"]}/>
                            </div>
                            <div className={styles["btn-title"]}>
                                <span> Travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav