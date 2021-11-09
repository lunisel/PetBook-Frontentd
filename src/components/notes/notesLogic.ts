import { RouteComponentProps } from "react-router";
import { postPutNoteInt } from "../../utils/interfaces";

export const addNewNote = async (userId : string) => {
  try {
      console.log(userId)
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/notes/me`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({user: userId}),
        }
      );
      return response
  } catch (err) {
    console.log(err);
  }
};
