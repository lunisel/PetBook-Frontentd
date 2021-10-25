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
    default:
      return state;
  }
};

export default userReducer;
