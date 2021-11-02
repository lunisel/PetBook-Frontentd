export const getAllPosts = async () => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`);

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
