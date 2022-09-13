import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const inviteToJoinTrip = async (tripId, usernameOrEmail) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;

  const res = await axios({
    method: "POST",
    url: `${baseUrl}/api/invitation/${tripId}/invite/${usernameOrEmail}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const removeTripMates = async (tripId, usernameOrEmail) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;

  const res = await axios({
    method: "DELETE",
    url: `${baseUrl}/api/invitation/${tripId}/uninvite/${usernameOrEmail}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteTrip = async (tripId) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;

  const res = await fetch(`${baseUrl}/api/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const getUsersLiked = async (tripId) => {
  const options = {
    method: "GET",
  };

  try {
    const res = await fetch(`${baseUrl}/api/trips/like/${tripId}`, options);
    return await res.json();
  } catch (err) {
    return [];
  }
}

export const likeTrip = async (tripId) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${baseUrl}/api/trips/like/${tripId}`, options);
  return res;
};

export const unlikeTrip = async (tripId) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${baseUrl}/api/trips/like/${tripId}`, options);
  return res;

};

export const getComments = async (tripId) => {
  const options = {
    method: "GET"
  };

  try {
    const res = await fetch(`${baseUrl}/api/trips/${tripId}/comments`, options);
    const json = await res.json();
    return json || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const commentTrip = async (tripId, content) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  };
  console.log("OPTIONS", options);

  const res = await fetch(`${baseUrl}/api/trips/${tripId}/comments`, options);

  return res;
};

export const deleteComment = async (commentId) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("OPTIONS", options);

  const res = await fetch(
    `${baseUrl}/api/trips/comments/${commentId}`,
    options
  );

  return res;
};

export const updateComment = async (comment) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);
  const { token } = userLogin;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: comment.content
    })
  }

  const res = await fetch(
    `${baseUrl}/api/trips/comments/${comment.id}`,
    options
  );

  return res;
}
export const replyComment = async (id, replyContent) => {
  const userLoginString = localStorage.getItem("userLogin");
  if (!userLoginString) {
    return;
  }

  const userLogin = JSON.parse(userLoginString);

  const { token } = userLogin;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: replyContent
    })
  }


  const res = await fetch(`${baseUrl}/api/trips/comments/${id}/reply`, options);

  return res;
}
