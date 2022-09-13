import axios from "axios";
import { NotificationManager } from "react-notifications";
const API_URL = process.env.REACT_APP_API_URL;

export const putGrant = (username, setHandleGrant) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return () => {
    axios({
      method: "PUT",
      url: `${API_URL}/api/admin/users/grant/${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setHandleGrant(username);
        NotificationManager.success(res.data.message);
        setHandleGrant(null);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.message);
      });
  };
};
export const putRevoke = (username, setHandleGrant) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return () => {
    axios({
      method: "PUT",
      url: `${API_URL}/api/admin/users/revoke/${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setHandleGrant(username);
        NotificationManager.success(res.data.message);
        setHandleGrant(null);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.message);
      });
  };
};
export const putBlock = (username, setHandleGrant) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return () => {
    axios({
      method: "PUT",
      url: `${API_URL}/api/admin/users/block/${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const message = res.data.username + " has been blocked";
        setHandleGrant(username);
        NotificationManager.success(message);
        setHandleGrant(null);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.message);
      });
  };
};
export const putUnBlock = (username, setHandleGrant) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return () => {
    axios({
      method: "PUT",
      url: `${API_URL}/api/admin/users/unblock/${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const message = res.data.username + " has been Unblocked";
        setHandleGrant(username);
        NotificationManager.success(message);
        setHandleGrant(null);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.message);
      });
  };
};
export const putDeleteTrip = (id, userList, setUserList) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";
  return () => {
    axios({
      method: "DELETE",
      url: `${API_URL}/api/admin/trips/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserList(userList.filter((elm) => elm.id !== id));
        const message = "this trip has been deleted successfully";
        NotificationManager.success(message);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.message);
      });
  };
};
