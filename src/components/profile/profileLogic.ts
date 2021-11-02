import Axios from "axios";
import { infoMeInt, userInt } from "../../utils/interfaces";

export const handleOnChange = (
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
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
    return response
    /* if (response.ok) {
      let data = await response.json();
      return data;
    } */
  } catch (err) {
    console.log(err);
  }
};

export const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  try {
    console.log("FILE ON CHANGE")
    console.log(e.target.files![0]);

    const formData = new FormData()
    formData.append("file", e.target.files![0])
    formData.append("upload_preset", "avatar upload")

    Axios.post(`${process.env.REACT_APP_BE_URL}/users/me/avatar`, {
      formData
    }, {
      headers:{
        "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then((response) => console.log(response))
    
    /* 
    const data = new FormData();
    data.append("file", e.target.files![0]); */
    /* let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/me/avatar`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: files[0],
      }
    );
    if (response.ok) {
      let data = await response.json()
      return data
    } else {
      console.log("Something went wrong uploading the avatar :(");
    } */
  } catch (err) {
    console.log(err);
  }
};
