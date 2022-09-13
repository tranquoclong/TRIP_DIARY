import styles from './PriceItem.module.css'
import React from "react";
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai'
import SavePriceItem from './SavePriceItem';

const PriceItem = ({
  id,
  item,
  isUpdated,
  handleUpdate,
  handleDelete,
  concurrencyUnit,
  onClose,
  onOpen,
  isView
}) => {


  return <div>
    <div className={styles.item}>
      <div>
        <span>{item["name"]}</span>
      </div>
      <div className={styles.price}>
        <span>{item.price} {concurrencyUnit || "$"}</span>
      </div>
      {
        !isView &&
        <div className={styles.actions} >
          <div
            className={`${styles.action_update} ${styles.action}`}
            onClick={onOpen}
          >
            <AiOutlineEdit />
          </div>
          <div
            className={`${styles.action_delete} ${styles.action}`}
            onClick={handleDelete}>
            <AiOutlineClose />
          </div>
        </div>
      }
    </div>
    {isUpdated &&
      <SavePriceItem
        id={id}
        item={item}
        handleClose={onClose}
        handleSaveItem={handleUpdate}
      />}
  </div >;
};

export default PriceItem;
