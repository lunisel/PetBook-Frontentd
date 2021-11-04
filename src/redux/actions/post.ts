import { postInt } from "../../utils/interfaces";

export const addSelectedPost = (post: postInt) => ({
  type: "ADD_SELECTED_POST",
  payload: post,
});

export const deleteSelectedPost = () => ({
  type: "DELETE_SELECTED_POST",
});
