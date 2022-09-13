import React, { Component } from "react";
import styles from "./tab.module.css";
import stylesTab from "../settingProfile.module.css";
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
      <li onClick={onClick}>
        <div className={stylesTab.barOfa}>
          <span className={stylesTab.barOfSpan}>
            <Icon />
          </span>
          <label className={className}>{label}</label>
        </div>
      </li>
    );
  }
}

export default Tab;
