import axios from "axios";
import { NotificationManager } from "react-notifications";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  ACT_LOGOUT,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESETPASSWORD_FAILED,
  RESETPASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  RESETPASSWORD_REQUEST_FAILED,
  RESETPASSWORD_REQUEST_SUCCESS,
  LIST_USER_SUCCESS,
  LIST_USER_FAILED,
  LIST_TRIP_SUCCESS,
  LIST_TRIP_FAILED,
  USER_SUCCESS,
  USER_FAILED,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILED,
  GET_INFO_SUCCESS,
  ADMIN_SUCCESS,
} from "../constants/user.const";
import { startLoading, stopLoading } from "../actions/common.action";

const API_URL = process.env.REACT_APP_API_URL;
// const userLogin = localStorage.getItem("userLogin");
// const token = userLogin ? JSON.parse(userLogin).token : "";

export const postLogin = (usernameOrEmail, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/auth/signin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        usernameOrEmail,
        password,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(postLoginSuccess(res.data));
        localStorage.setItem("userLogin", JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(postLoginFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};

export const postLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const postLoginFailed = (err) => {
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
};

export function actLogout() {
  return {
    type: ACT_LOGOUT,
  };
}
export const postRegistration = (values, goBack) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/auth/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(postRegistrationSuccess(res.data));
        goBack.push("/login");
        NotificationManager.success(res.data.message);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(postRegistrationFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};

const postRegistrationSuccess = (user) => {
  return {
    type: REGISTRATION_SUCCESS,
    payload: user,
  };
};

const postRegistrationFailed = (err) => {
  return {
    type: REGISTRATION_FAILED,
    payload: err,
  };
};

export const postResetPasswordRequest = (forgotPassword) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/auth/reset-password-request`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: forgotPassword,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(postResetPasswordRequestSuccess(res.data));
        NotificationManager.success(res.data.message);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(postResetPasswordRequestFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};

const postResetPasswordRequestSuccess = (user) => {
  return {
    type: RESETPASSWORD_REQUEST_SUCCESS,
    payload: user,
  };
};

const postResetPasswordRequestFailed = (err) => {
  return {
    type: RESETPASSWORD_REQUEST_FAILED,
    payload: err,
  };
};

export const postResetPassword = (token, newPassword, goBack) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/auth/reset-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        token: token,
        newPassword: newPassword,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(postResetPasswordSuccess(res.data));
        goBack.push("/login");
        NotificationManager.success(res.data.message);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(postResetPasswordFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};

const postResetPasswordSuccess = (user) => {
  return {
    type: RESETPASSWORD_SUCCESS,
    payload: user,
  };
};

const postResetPasswordFailed = (err) => {
  return {
    type: RESETPASSWORD_FAILED,
    payload: err,
  };
};

export const getListUser = (
  page,
  userList,
  setUserList,
  setTotalPages,
  setLoading,
  size
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/users/trips?page=${page}&size=${size}`,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        setUserList([...userList, ...res.data.data]);
        setLoading(false);
        setTotalPages(res.data.total);
        dispatch(getListUserSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListUserFailed(err));
      });
  };
};

export const getListUserSuccess = (listUser) => {
  return {
    type: LIST_USER_SUCCESS,
    payload: listUser,
  };
};

const getListUserFailed = (err) => {
  return {
    type: LIST_USER_FAILED,
    payload: err,
  };
};
export const getListImagesByTrip = (id, setListImages, setLoading) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return (dispatch) => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${API_URL}/api/admin/trips/${id}/images`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: null,
    })
      .then((res) => {
        setListImages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
};
export const getListTripByAdmin = (
  page,
  userList,
  setUserList,
  setTotalPages,
  setLoading
) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/admin/trips?page=${page}&size=9`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        setUserList([...userList, ...res.data.data]);
        setLoading(false);
        setTotalPages(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getListTrip = (
  page,
  userList,
  setUserList,
  setTotalPages,
  setLoading
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/trips?page=${page}&size=9`,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        setUserList([...userList, ...res.data.data]);
        setLoading(false);
        setTotalPages(res.data.total);
        dispatch(getListTripSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListTripFailed(err));
      });
  };
};

export const getListTripSuccess = (listTrip) => {
  return {
    type: LIST_TRIP_SUCCESS,
    payload: listTrip,
  };
};

const getListTripFailed = (err) => {
  return {
    type: LIST_TRIP_FAILED,
    payload: err,
  };
};
export const getUser = (username, setErrUser) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/users/${username}/trips`,
      data: null,
    })
      .then((res) => {
        dispatch(getUserSuccess(res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        setErrUser && setErrUser(err);
        dispatch(getUserFailed(err));
        dispatch(stopLoading());
      });
  };
};
export const getMe = (username, setErrUser) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/users/${username}/trips?target=me`,
      data: null,
    })
      .then((res) => {
        dispatch(getUserSuccess(res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        setErrUser(err);
        dispatch(getUserFailed(err));
        dispatch(stopLoading());
      });
  };
};

export const getUserSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};

const getUserFailed = (err) => {
  return {
    type: USER_FAILED,
    payload: err,
  };
};
export const getAdmin = (username) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/api/users/${username}/trips?target=me`,
      data: null,
    })
      .then((res) => {
        dispatch(getAdminSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAdminSuccess = (admin) => {
  return {
    type: ADMIN_SUCCESS,
    payload: admin,
  };
};

export const postChangePassword = (confirmPassword, password) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";

  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/api/user/change-password`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        confirmPassword,
        password,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(postChangePasswordSuccess(res.data));
        NotificationManager.success(res.data.message);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(postChangePasswordFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};

const postChangePasswordSuccess = (change) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: change,
  };
};

const postChangePasswordFailed = (err) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    payload: err,
  };
};

export const updateInfo = (
  profileImageUrl,
  coverImageUrl,
  aboutMe,
  gender,
  dateOfBirth,
  values
) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";

  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "PUT",
      url: `${API_URL}/api/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        aboutMe,
        city: values.city,
        country: values.country,
        coverImageUrl,
        dateOfBirth,
        firstName: values.firstName,
        gender,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        profileImageUrl,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(updateInfoSuccess(res.data));
        NotificationManager.success(res.data.message);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(updateInfoFailed(err));
        NotificationManager.error(err.response.data.message);
      });
  };
};
export const getAccountInfo = () => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/api/user/account`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getInfoSuccess(res.data));
      })
      .catch((err) => {
        console.log("🚀 err", err);
      });
  };
};
const getInfoSuccess = (getInfo) => {
  return {
    type: GET_INFO_SUCCESS,
    payload: getInfo,
  };
};
const updateInfoSuccess = (info) => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: info,
  };
};

const updateInfoFailed = (err) => {
  return {
    type: UPDATE_INFO_FAILED,
    payload: err,
  };
};
