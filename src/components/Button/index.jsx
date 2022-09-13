import React from 'react';
import styles from './Button.module.css';

const Button = ({ name, color }) => {
  const className = `${styles.button} ${color === "red" ? styles["bg_red"] : styles["bg_blue"]}`;
  console.log(className);
  return (
    <a href="/sign/up" class="w_ih w_in">
      <div class="w_A9 w_A-" width="101.3125" height="22" style="width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><span class="w_ia">Join Worldee</span></div>
    </a>
  )
}

export default Button

