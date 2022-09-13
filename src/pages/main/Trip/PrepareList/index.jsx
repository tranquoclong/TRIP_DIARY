import React, { useState } from "react";
import styles from "./PrepareList.module.css";

import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { GiLightBackpack } from "react-icons/gi";
import NoItem from "../NoItem";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PREPARED_LIST,
  TRIP_MODE,
} from "../../../../store/constants/trip.const";

const PrepareList = ({ items, addItems }) => {
  const { trip, mode } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const [list, setList] = useState(trip.preparedList || []);
  const [updatedId, setUpdateId] = useState(0);

  const handleUpdateItem = (e, id) => {
    const value = e.target.value;
    let newList = [...list];
    newList[id] = value;
    dispatch({
      type: SET_PREPARED_LIST,
      payload: newList,
    });
    setList(newList);
  };

  const handleRemoveItem = (id) => {
    let newList = list.filter((item, index) => index !== id);
    dispatch({
      type: SET_PREPARED_LIST,
      payload: newList,
    });
    setList(newList);
  };

  const handleAddItem = () => {
    setUpdateId(list.length);
    setList((prev) => {
      return prev.length !== 0 && prev.slice(-1)[0].length === 0
        ? [...prev]
        : [...prev, ""];
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        <GiLightBackpack />
        What should be prepared? ({list.length})
      </h3>
      <div className={styles.list_container}>
        {list && list.length !== 0 ? (
          list.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.item_name}>
                <span>{index + 1}. </span>
                <input
                  value={item}
                  onChange={(e) => handleUpdateItem(e, index)}
                  autoFocus={index === updatedId ? true : false}
                  disabled={mode === TRIP_MODE.VIEW}
                />
              </div>
              {
                mode !== TRIP_MODE.VIEW
                &&
                <div
                  className={styles.action_button}
                  onClick={() => handleRemoveItem(index)}
                >
                  <AiOutlineCloseCircle />
                </div>
              }
            </div>
          ))
        ) : (
          <NoItem />
        )}
      </div>
      {mode !== TRIP_MODE.VIEW && (
        <div className={styles.add_item} onClick={handleAddItem}>
          <div className={styles.add_button}>
            <AiOutlinePlusCircle />
          </div>
          <span>Add new item</span>
        </div>
      )}
    </div>
  );
};

export default PrepareList;
