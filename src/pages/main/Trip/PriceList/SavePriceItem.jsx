import React, { useState } from "react";
import styles from "./SavePriceItem.module.css";

const SavePriceItem = ({ item, handleClose, handleSaveItem }) => {
  const [newItem, setNewItem] = useState(item);
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "name") {
      setError((prev) => ({ price: prev.price }));
      setNewItem((prev) => ({ ...prev, name: value }));
    } else {
      setError((prev) => ({ name: prev.name }));
      setNewItem((prev) => ({ ...prev, price: +value }));
    }
  };

  const onClickSave = () => {
    if (!newItem || !newItem.name || newItem.name === "" || !newItem.price || +newItem.price <= 0) {
      if (!newItem || !newItem.name || newItem.name === "") {
        setError((prev) => ({ ...prev, name: "Name is required" }));
      }
      if (!newItem || !newItem.price || +newItem.price <= 0) {
        setError(prev => ({ ...prev, price: "Price should be more than 0" }))
      }
    } else {
      handleSaveItem(newItem);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.name}>
          <h4>Name</h4>
          <input
            name="name"
            value={(newItem && newItem.name) || ""}
            onChange={handleChange}
          />
          <span className={styles.error}>{error && error.name}</span>
        </div>
        <div className={styles.price}>
          <h4>Price</h4>
          <input
            name="price"
            type="number"
            min={0}
            value={(newItem && newItem.price) || ""}
            onChange={handleChange}
          />
          <span className={styles.error}>{error && error.price}</span>
        </div>
        <div className={styles.actions}>
          <div className={styles.save_button} onClick={onClickSave}>
            <button>Save</button>
          </div>
          <div className={styles.close_button} onClick={handleClose}>
            <button>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePriceItem;
