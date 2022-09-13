import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "./styles.css";
import { useSelector } from "react-redux";

function GetDate(props) {
  const { trip } = useSelector(state => state.trip);

  const [dates, setDates] = useState({});


  useEffect(() => {
    setDates({
      startDate: trip.beginDate ? trip.beginDate : new Date(),
      endDate: trip.endDate ? trip.endDate : trip.beginDate ? trip.beginDate : new Date(),
      key: "selection"
    })
  }, [trip.endDate, trip.beginDate])

  const handleDateChange = item => {
    props.onDateChange(item.selection);
    setDates(item.selection);
  }


  return (
    <DateRange
      dateDisplayFormat={"dd/MM/yyyy"}
      onChange={handleDateChange}
      minDate={new Date()}
      moveRangeOnFirstSelection={false}
      ranges={[dates]}
      locale={locales["vi"]}
      rangeColors={["#00e1d6"]}
      {...props}
    />
  );
}

export default GetDate;
