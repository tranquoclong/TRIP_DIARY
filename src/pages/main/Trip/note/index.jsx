import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteEditor from "../../../../components/NoteEditor";
import { SET_NOTE, TRIP_MODE } from "../../../../store/constants/trip.const";
import styles from "../trip.module.css";

function Note() {
  const { trip, mode } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const handleChangeNote = (html) => {
    dispatch({
      type: SET_NOTE,
      payload: html,
    });
  };
  // box-sizing: border-box;
  //   /* height: 100%; */
  //   overflow: auto;
  //   /* background-image: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,100%,0) calc(1.75rem - 1px),#e9edf0 0); */
  //   background-attachment: local;
  //   background-image: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,100%,0) calc(1.75rem - 1px),#e9edf0 0);
  //   background-size: 100% 1.75rem;
  //   border: none;
  //   border-radius: 0;
  //   height: 48vh;
  //   line-height: 1;
  //   max-height: none;
  //   padding: 0 13px;

  return (
    <div className={styles.container}>
      <div className={styles.iTin}>
        <div className={styles.iTin} style={{ position: "relative" }}>
          <div className={styles.tripItin}>
            <div style={{ padding: "32px 32px 0" }}>
              <label>Notes</label>
              <NoteEditor
                html={trip.note || ""}
                setHtml={handleChangeNote}
                viewOnly={mode === TRIP_MODE.VIEW}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
