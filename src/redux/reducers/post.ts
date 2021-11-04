import { postInt } from "../../utils/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../store";

const postReducer = (
  state = initialState.posts,
  action: PayloadAction<postInt | null>
) => {
  switch (action.type) {
    case "ADD_SELECTED_POST":
      return {
        ...state,
        selectedPost: action.payload,
      };
    case "DELETE_SELECTED_POST":
      return {
        ...state,
        selectedPost: null,
      };
    default:
      return state;
  }
};

export default postReducer;
