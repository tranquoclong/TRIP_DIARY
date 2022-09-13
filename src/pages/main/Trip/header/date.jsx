import moment from "moment";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GetDate from "../../../../components/DateRange";
import { SET_DATE, TRIP_MODE } from "../../../../store/constants/trip.const";
import styles from "../trip.module.css";
// import { useDetectOutsideClick } from "./../../../../components/useDetectOutsideClick";
import { BsCalendar3 } from "react-icons/bs";
import useOutsideClick from "../../../../hooks/useOutsideClick";
export default function Date() {
  const { trip, mode } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const [isSingleTrip, setIsSingleTrip] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useOutsideClick(dropdownRef, () => setIsActive(false));

  const onClick = () => {
    //view or trip occur
    if (mode === TRIP_MODE.VIEW) {
      return;
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsSingleTrip(trip.endDate === null);
  }, [trip]);

  const onChangeTripType = () => {
    dispatch({
      type: SET_DATE,
      payload: {
        beginDate: trip.beginDate,
        endDate: !isSingleTrip ? null : trip.beginDate,
      },
    });
    setIsSingleTrip((prev) => !prev);
  };

  // const handleDateChange = useCallback(
  //   (dates) => {
  //     dispatch({
  //       type: SET_DATE,
  //       payload: {
  //         beginDate: dates.startDate,
  //         endDate: !isSingleTrip ? dates.endDate : null,
  //       },
  //     });
  //   },
  //   // eslint-disable-next-line
  //   []
  // );
  const handleDateChange = (dates) => {
    dispatch({
      type: SET_DATE,
      payload: {
        beginDate: dates.startDate,
        endDate: !isSingleTrip ? dates.endDate : null,
      },
    });
  };

  return (
    <div className={styles.tripDate}>
      <div className={styles.date}>
        <button onClick={onClick}>
          <BsCalendar3 style={{ marginRight: "10px" }} />
          {isSingleTrip ? (
            <span>
              {trip.beginDate && moment(trip.beginDate).format("DD/MM/YYYY")}
            </span>
          ) : (
            <span>
              {trip.beginDate && moment(trip.beginDate).format("DD/MM/YYYY")} -{" "}
              {trip.endDate && moment(trip.endDate).format("DD/MM/YYYY")}
            </span>
          )}
        </button>
        <div
          ref={dropdownRef}
          className={`${styles.formTripDate} ${
            isActive ? `${styles.active}` : "inactive"
          }`}
        >
          <div className={styles.dropdownTop} style={{ left: "50% " }}>
            <svg
              data-testid="arrow"
              className={styles.popupArrow}
              viewBox="0 0 32 16"
              style={{ position: "absolute" }}
            >
              <path d="M16 0l16 16H0z" fill="currentcolor" />
            </svg>
          </div>
          <div className={styles.formDate}>
            <label>Date</label>
            <div className={styles.tripType}>
              <div className={styles.change}>
                <div
                  className={`${styles.transition} ${
                    isSingleTrip ? "inactive" : `${styles.activeExact}`
                  }`}
                />
                <label
                  className={`${isSingleTrip ? `${styles.cur}` : ""}`}
                  onClick={onChangeTripType}
                >
                  <div className={styles.changeTitle}>
                    <span>Round Trip</span>
                  </div>
                </label>
                <label
                  className={`${!`${styles.cur}`}`}
                  onClick={onChangeTripType}
                >
                  <div className={styles.changeTitle}>
                    <span>Single Trip</span>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.selectDate}>
              {isSingleTrip ? (
                <GetDate
                  onDateChange={handleDateChange}
                  focusedRange={[0, 0]}
                  // selectEnd={false}
                  showDateDisplay={false}
                />
              ) : (
                <GetDate
                  onDateChange={handleDateChange}
                  editableDateInputs={true}
                  showDateDisplay={false}
                />
              )}
            </div>
            <div className={styles.buttonSetDate}>
              <div style={{ flex: "1 1 0%", textAlign: "left" }}>
                <button
                  style={{
                    background: "#eff4f9",
                    boxShadow: " 0 0 7px #f4f8fb",
                  }}
                  onClick={onClick}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
