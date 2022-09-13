import React from 'react'
import styles from './Loading.module.css'
const Loading = ({ isSmall, isDark }) => {
    return (
        <div className={isSmall ? `${styles.container} ${styles.small}` : `${styles.container}`}>
            <div className={styles.loader}>Loading...</div>
        </div >
    )
}

export default Loading