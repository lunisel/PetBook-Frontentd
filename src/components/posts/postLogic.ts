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
    return response
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
    return response
  } catch (err) {
    console.log(err);
  }
}
