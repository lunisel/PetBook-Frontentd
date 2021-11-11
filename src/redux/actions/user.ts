import { getNoteInt, postPutNoteInt, userInt } from "../../utils/interfaces";

export const addCurrentUser = (user: userInt) => ({
  type: "ADD_CURRENT_USER",
  payload: user,
});

export const disconnectUser = () => ({
  type: "DISCONNECT_USER"
})

export const addSelectedNote = (note : postPutNoteInt) => ({
  type: "ADD_SELECTED_NOTE",
  payload: note
})

export const removeSelectedNote = () => ({
  type: "REMOVE_SELECTED_NOTE",
})