import { RouteComponentProps } from "react-router";
import { postPutNoteInt } from "../../utils/interfaces";

export const addNewNote = async (userId: string) => {
  try {
    console.log(userId);
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/notes/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user: userId }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMyNotes = async () => {
  try {
    let response =  await fetch(`${process.env.REACT_APP_BE_URL}/notes/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      }
    });
    return response
  } catch (err) {
    console.log(err);
  }
};

export const putSingleNote = async (noteChange : postPutNoteInt, noteId: string) => {
  try {
    let response =  await fetch(`${process.env.REACT_APP_BE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(noteChange)
    });
    return response
  } catch (err) {
    console.log(err);
  }
}