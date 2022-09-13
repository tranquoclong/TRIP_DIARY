// import { async } from '@firebase/util'
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { GrGroup } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  PopupContainer,
  PopupIcon,
  PopupContent,
  PopupHeader,
  PopupMap,
  TripInfo,
  TripDestination,
  TripDate,
  TripMates,
  TripTransportation,
} from "./NotificationPopup.style";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { Link } from "react-router-dom";
import NotificationMap from "./NotificationMap";
import moment from "moment";
import { SET_LOCATION } from "../../store/constants/map.const";
const API_URL = process.env.REACT_APP_API_URL;

const NotificationPopup = (props) => {
  const [isActive, setIsActive] = useState(true);
  const ref = useRef();
  useOutsideClick(ref, () => setIsActive(false));
  const { user } = useSelector((state) => state.user);
  const { location } = useSelector((state) => state.map);
  const [occuringTrip, setOccuringTrip] = useState(null);
  const dispatch = useDispatch();

  const isOccurringTrip = (trip) => {
    if (!trip) {
      return false;
    }

    const today = moment(new Date()).format("YYYY-MM-DD");

    if (!trip.endDate || trip.endDate === "") {
      return moment(today, "YYYY-MM-DD").isSame(
        moment(trip.beginDate, "YYYY-MM-DD")
      );
    } else {
      return (
        !moment(today, "YYYY-MM-DD").isBefore(
          moment(trip.beginDate, "YYYY-MM-DD")
        ) &&
        !moment(today, "YYYY-MM-DD").isAfter(moment(trip.endDate, "YYYY-MM-DD"))
      );
    }
  };

  useEffect(
    () => {
      let isMounted = true;

      const getOccurringTrip = async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/users/${user.username}/trips?target=me`
          );
          const data = await response.json();
          const trips = data.trips;

          const trip = trips.find((trip) => isOccurringTrip(trip));
          if (trip && isMounted) {
            setOccuringTrip(trip);
            dispatch({
              type: SET_LOCATION,
              payload: {
                ...trip.destination,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      getOccurringTrip();

      return () => (isMounted = false);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      {occuringTrip ? (
        <PopupContainer ref={ref}>
          <PopupIcon onClick={() => setIsActive((prev) => !prev)}>
            <IoMdNotifications className="icon" />
          </PopupIcon>
          <PopupContent className={isActive ? "active" : "inactive"}>
            <PopupHeader>
              <p>OCCURING TRIP</p>
              <Link to={`/trip/${occuringTrip.id}`} className="trip_name">
                <span>{occuringTrip.name}</span>
              </Link>
            </PopupHeader>
            <PopupMap>
              <NotificationMap zoom={6} destination={location} />
            </PopupMap>
            <TripInfo>
              <TripDestination
                onClick={() => {
                  dispatch({
                    type: SET_LOCATION,
                    payload: {
                      ...occuringTrip.destination,
                    },
                  });
                }}
              >
                <div className="icon_wrapper">
                  <GoLocation className="icon" />
                </div>
                <span>{occuringTrip.destination?.address}</span>
              </TripDestination>
              <TripDate>
                <div className="icon_wrapper">
                  <BsCalendarEvent className="icon" />
                </div>
                <span>
                  {occuringTrip.beginDate}{" "}
                  {occuringTrip.endDate &&
                    occuringTrip.endDate !== "" &&
                    ` - ${occuringTrip.endDate}`}
                </span>
              </TripDate>
              <TripMates>
                <div className="icon_wrapper">
                  <GrGroup className="icon" />
                </div>

                <div className="trip_mates">
                  <Link
                    key={occuringTrip.owner}
                    to={`/profile/${occuringTrip.owner}`}
                    className="user_tag"
                  >
                    <span>{occuringTrip.owner}</span>
                  </Link>
                  {occuringTrip.tripMates &&
                    occuringTrip.tripMates.map((item) => (
                      <Link
                        key={item}
                        to={`/profile/${item}`}
                        className="user_tag"
                      >
                        <span>{item}</span>
                      </Link>
                    ))}
                </div>
              </TripMates>
              <TripTransportation>
                <div className="icon_wrapper">
                  <MdOutlineEmojiTransportation className="icon" />
                </div>
                <span>
                  {occuringTrip.transportation.slice(0, 1).toUpperCase() +
                    occuringTrip.transportation.slice(1).toLowerCase()}
                </span>
              </TripTransportation>
            </TripInfo>
          </PopupContent>
        </PopupContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default NotificationPopup;
