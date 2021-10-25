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

export const handleOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string,
  signup: signUpInt,
  setSignup: any
) => {
  if (key === "name" || key === "surname") {
    setSignup({
      ...signup,
      myOwner: {
        ...signup.myOwner,
        [key]: e.target.value,
      },
    });
  } else {
    setSignup({
      ...signup,
      [key]: e.target.value,
    });
  }
};
