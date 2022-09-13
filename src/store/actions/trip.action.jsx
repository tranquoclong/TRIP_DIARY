import axios from "axios";
import { NotificationManager } from "react-notifications";
import {
  CHANGE_MODE,
  SET_TRIP,
  SET_TRIP_ID,
  TRIP_MODE,
} from "../constants/trip.const";
import { startLoading, stopLoading } from "./common.action";
import moment from "moment";
import { actLogout } from "./user.action";
const API_URL = process.env.REACT_APP_API_URL;

export const saveTrip = (trip) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/trips`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        ...trip,
        beginDate: moment(trip.beginDate).format("YYYY-MM-DD"),
        endDate: trip.endDate
          ? moment(trip.endDate).format("YYYY-MM-DD")
          : null,
      }),
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch({
          type: CHANGE_MODE,
          payload: TRIP_MODE.UPDATE,
        });
        dispatch({
          type: SET_TRIP_ID,
          payload: res.data.id,
        });
        NotificationManager.success("Trip was planned successfully");
      })
      .catch((err) => {
        dispatch(stopLoading());
        if (err.response.data === "") {
          dispatch(actLogout());
          NotificationManager.error("session has expired please login again");
        } else {
          NotificationManager.error(err.response.data.message);
        }
      });
  };
};

export const setTrip = (id, setErrorTrip) => {
  return async (dispatch, getState) => {
    const { user } = getState().user;
    dispatch(startLoading());
    await axios({
      method: "GET",
      url: `${API_URL}/api/trips/${id}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        const { data } = res;

        const canUpdate =
          user &&
          (user.username === data.owner ||
            data.tripMates.includes(user.username));

        const visitDays = data.visitDays.map((day) => ({
          id: Math.random().toString().substring(2, 9),
          ...day,
          visitPlaces: day.visitPlaces.map((place) => ({
            ...place,
            id: Math.random().toString().substring(2, 9),
          })),
        }));

        dispatch({
          type: SET_TRIP,
          payload: {
            mode: canUpdate ? TRIP_MODE.UPDATE : TRIP_MODE.VIEW,
            trip: {
              ...data,
              visitDays: visitDays,
              beginDate: data.beginDate
                ? moment(data.beginDate, "YYYY-MM-DD").toDate()
                : new Date(),
              endDate: data.endDate
                ? moment(data.endDate, "YYYY-MM-DD").toDate()
                : null,
              status: data.status?.toLowerCase(),
              transportation: data.transportation.toLowerCase(),
            },
          },
        });
      })
      .catch((err) => {
        dispatch(stopLoading());
        setErrorTrip(err);
        NotificationManager.error(err.response.data.message);
      });
  };
};

export const updateTrip = (trip) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";

  return async (dispatch) => {
    dispatch(startLoading());
    await axios({
      method: "PUT",
      url: `${API_URL}/api/trips/${trip.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        ...trip,
        beginDate: moment(trip.beginDate).format("YYYY-MM-DD"),
        endDate: trip.endDate ? moment(trip.endDate).format("YYYY-MM-DD") : "",
      }),
    })
      .then((res) => {
        dispatch(stopLoading());
        NotificationManager.success("Trip was updated successfully");
      })
      .catch((err) => {
        dispatch(stopLoading());
        NotificationManager.error(err.response.data.message);
      });
  };
};
