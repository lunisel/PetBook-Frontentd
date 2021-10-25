import { userInt } from "../../utils/interfaces";

export const addCurrentUser = (user: userInt) => ({
  type: "ADD_CURRENT_USER",
  payload: user,
});

export const disconnectUser = () => ({
  type: "DISCONNECT_USER"
})