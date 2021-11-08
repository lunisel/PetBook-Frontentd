import Axios from "axios";
import { infoMeInt, userInt } from "../../utils/interfaces";

export const handleOnChange = (
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>,
  key: string,
  updatedUser: infoMeInt | null,
  setUpdatedUser: any,
  user: userInt
) => {
  if (key === "name" || key === "surname" || key === "birthdayOwner") {
    if (key === "name") {
      setUpdatedUser({
        myOwner: {
          surname: user.myOwner.surname,
          [key]: e.currentTarget.value,
        },
      });
    } else if (key === "surname") {
      setUpdatedUser({
        myOwner: {
          name: user.myOwner.name,
          [key]: e.currentTarget.value,
        },
      });
    } else if (key === "birthdayOwner") {
      setUpdatedUser({
        myOwner: {
          name: user.myOwner.name,
          surname: user.myOwner.surname,
          birthday: e.currentTarget.value,
        },
      });
    }
  } else {
    setUpdatedUser({
      [key]: e.currentTarget.value,
    });
  }
};

export const handleSubmit = async (updatedUser: infoMeInt | null) => {
  console.log(updatedUser);
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedUser),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateOwnerAvatar = async (updatedUser: infoMeInt | null) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me/owner/avatar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedUser),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const changeImg = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreview: any,
  setUpdatedUser: any,
  key: string
) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files![0]);
  data.append("upload_preset", "avatarUpload");

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
      setUpdatedUser({
        [key]: file.secure_url,
      });
      setPreview(file.secure_url);
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchProfileFromUsername = async (username: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/${username}`
    );
    if (response.ok) {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};


export const getPostsFromSingleUser = async (userId : string | undefined) => {
  try{
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/posts/${userId}`
    );
    if(response.ok){
      let data = await response.json()
      return data
    }
  }catch(err){console.log(err)}
}