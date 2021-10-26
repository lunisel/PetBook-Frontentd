import { logInInt } from "../../utils/interfaces";

export const handleSubmit = async (login: logInInt) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
    });
    if (response.ok) {
      let data = await response.json();
      let accessToken = data.accessToken;
      let refreshToken = data.refreshToken;
      if (login.stayConnected) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("token2", refreshToken);
      }
      let user = getMeFromToken(accessToken);
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

const getMeFromToken = async (token: string) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string,
  login: logInInt,
  setLogin: any
) => {
  setLogin({
    ...login,
    [key]: e.target.value,
  });
};
