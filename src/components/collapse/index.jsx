import React, { useEffect, useState } from "react";
import {
  IoChevronUpSharp,
  IoChevronDownSharp,
  IoTrashSharp,
  IoDocumentText,
} from "react-icons/io5";
import styles from "./Collapse.module.css";
const style = {
  collapsed: {
    display: "none",
  },
  expanded: {
    display: "block",
  },
  buttonStyle: {
    display: "block",
    width: "100%",
  },
};

function Collapse(props) {
  const {
    collapsed,
    day,
    onChangeDateDescription,
    order,
    onRemoveDay,
    children,
  } = props;

  const [isCollapsed, setCollapsed] = useState(collapsed);
  const [description, setDescription] = useState(day.description || "");

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(
    () => {
      const timer = setTimeout(() => {
        onChangeDateDescription(description);
      }, 1000);
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line
    [description]
  );

  const onChange = (event) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <div className={styles.dayOne}>
        <div className={styles.dayTop} onClick={() => toggleCollapse()}>
          {isCollapsed ? <IoChevronDownSharp /> : <IoChevronUpSharp />}
        </div>
        <div className={styles.spanOne}>Day {order + 1}</div>
        <div className={styles.dayBa}></div>
        {!props.isView && (
          <IoTrashSharp className={styles.trash} onClick={onRemoveDay} />
        )}
      </div>
      <div className={styles.write}>
        <div style={{ padding: "5.5px 10px 5.5px 80px", display: "flex" }}>
          <IoDocumentText style={{ fontSize: "25px" }} />
          <input
            type="text"
            placeholder="Write a description for this day"
            value={description}
            onChange={onChange}
            disabled={props.isView}
          />
        </div>
      </div>
      <div
        className="collapse-content"
        style={isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  );
}

export default Collapse;
