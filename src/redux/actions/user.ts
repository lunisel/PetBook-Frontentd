import { userInt } from "../../utils/interfaces";

export const addCurrentUser = (user: userInt) => ({
  type: "ADD_CURRENT_USER",
  payload: user,
});
