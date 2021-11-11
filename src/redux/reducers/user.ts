import { userInt } from "../../utils/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../store";

const userReducer = (
  state = initialState.user,
  action: PayloadAction<userInt | null>
) => {
  switch (action.type) {
    case "ADD_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "DISCONNECT_USER":
      return {
        ...state,
        currentUser: null,
      };
    case "ADD_SELECTED_NOTE":
      return {
        ...state,
        selectedNote: action.payload,
      };
    case "REMOVE_SELECTED_NOTE":
      return {
        ...state,
        selectedNote: null,
      };
    default:
      return state;
  }
};

export default userReducer;
