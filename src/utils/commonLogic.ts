import { RouteComponentProps } from "react-router-dom";
import { infoMeInt, postPutNoteInt, sendPostInt} from "./interfaces";

export const sendRequestWithToken = async (
  requestFuncion: any,
  props: RouteComponentProps,
  functionProp: string | null | infoMeInt | sendPostInt | undefined | postPutNoteInt ,
  secondFuncProp: string | null
  
) => {
  try {
    let response = await requestFuncion(functionProp, secondFuncProp);
    console.log("Common Logic ->", response);
    if (response.ok) {
      if (response.status === 204) {
        window.location.reload();
      } else {
        let data = await response.json();
        console.log("Common Logic ->", data);
        return data;
      }
    } else if (response.status === 401) {
      try {
        console.log(
          "SEND REQUEST WITH TOKEN FAILD, STATUS 401, REFRESHING SESSION..."
        );
        let response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: window.localStorage.getItem("token2"),
            }),
          }
        );
        if (response.ok) {
          let tokens = await response.json();
          let accessToken = tokens.accessToken;
          let refreshToken = tokens.refreshToken;
          if (accessToken) localStorage.setItem("token", accessToken);
          if (refreshToken) localStorage.setItem("token2", refreshToken);
          let resp = await requestFuncion(functionProp, secondFuncProp);
          if (resp.ok) {
            if (resp.status === 204) {
              window.location.reload();
            } else {
              let data = await resp.json();
              return data;
            }
          }
        } else {
          props.history.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
