import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  ACT_LOGOUT,
  LIST_USER_SUCCESS,
  LIST_USER_FAILED,
  USER_SUCCESS,
  USER_FAILED,
  LIST_TRIP_SUCCESS,
  LIST_TRIP_FAILED,
  GET_INFO_SUCCESS,
  ADMIN_SUCCESS,
} from "../constants/user.const";

const initialState = {
  user:
    JSON.parse(localStorage.getItem("jwtToken")) ||
    JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("jwtToken")) ||
        JSON.parse(localStorage.getItem("userLogin"))
      : null,

  listUser: [],
  listTrip: [],
  users: null,
  errors: {},
  getInfo: {},
  admin: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, user: payload };
    }
    case LOGIN_FAILED: {
      return { ...state, errors: payload };
    }
    case LIST_USER_SUCCESS: {
      return { ...state, listUser: payload };
    }
    case LIST_USER_FAILED: {
      return { ...state, errors: payload };
    }
    case LIST_TRIP_SUCCESS: {
      return { ...state, listTrip: payload };
    }
    case LIST_TRIP_FAILED: {
      return { ...state, errors: payload };
    }
    case USER_SUCCESS: {
      return { ...state, users: payload };
    }
    case USER_FAILED: {
      return { ...state, errors: payload };
    }
    case GET_INFO_SUCCESS: {
      return { ...state, getInfo: payload };
    }
    case ADMIN_SUCCESS: {
      return { ...state, admin: payload };
    }
    case ACT_LOGOUT:
      localStorage.removeItem("userLogin");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
