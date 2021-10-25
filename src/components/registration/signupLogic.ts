import { signUpInt } from "../../utils/interfaces";

export const handleSubmit = async (user: signUpInt) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
};
