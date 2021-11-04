export const getAllPosts = async () => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/friends`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMePosts = async () => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deletePosts = async (id: string) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const postNewComment = async (id: string, comment: string) => {
  try {
    console.log("post new comment function ->", comment);
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: comment }),
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${postId}/deleteComment/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (postId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const dislikePost = async (postId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${postId}/dislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();
  const actualTime = `${d}/${m}/${y}\n ${h}:${(min < 10 ? "0" : "") + min}`;
  return actualTime;
};
