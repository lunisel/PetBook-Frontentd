import { RouteComponentProps } from "react-router";
import { addSelectedNote } from "../../redux/actions/user";
import { getNoteInt, postPutNoteInt } from "../../utils/interfaces";

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
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/notes/me`, {
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

export const putSingleNote = async (
  noteChange: postPutNoteInt,
  noteId: string
) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/notes/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(noteChange),
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSingleNote = async (noteId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/notes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addImgToNote = async (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: any,
  note: getNoteInt | null
) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files![0]);
  data.append("upload_preset", "postImg");

  try {
    let response = await fetch(
      "https://api.cloudinary.com/v1_1/lunisel/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      let file = await response.json();
      dispatch(
        addSelectedNote({
          ...note,
          media: [...note!.media, file.secure_url],
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};
