import React, { Component } from "react";
import styles from "./tab.module.css";
class Tab extends Component {
  onClick = () => {
    const { label, onClick, Icon } = this.props;
    onClick(label, Icon);
  };
  render() {
    const {
      onClick,
      props: { activeTab, label, Icon },
    } = this;
    let className = styles["tab-list-item"];
    if (activeTab === label) {
      className += ` ${styles["tab-list-active"]}`;
    }
    return (
      <button className={className} onClick={onClick}>
        <div className={styles.icon}>
          <Icon />
        </div>
        <span className={styles.tabSpan}>{label}</span>
      </button>
    );
  }
}

export default Tab;
