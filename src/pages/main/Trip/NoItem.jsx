import React from "react";
import { AiOutlineWarning } from 'react-icons/ai';
import styles from './NoItem.module.css';

const NoItem = () => {
  return (<div className={styles.no_item}>
    <AiOutlineWarning />
    <span>No item to show</span>
  </div>)
};

export default NoItem;
