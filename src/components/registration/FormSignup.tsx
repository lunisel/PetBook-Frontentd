import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { reduxStateInt, signUpInt, userInt } from "../../utils/interfaces";
import { handleSubmit } from "./signupLogic";
import { addCurrentUser } from "../../redux/actions/user";

const FormSignup = ({ history }: RouteComponentProps) => {
  const [signup, setSignup] = useState<signUpInt>({
    petName: "",
    email: "",
    password: "",
    myOwner: {
      name: "",
      surname: "",
    },
    username: "",
  });

  const user: userInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );
  const dispatch = useDispatch();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
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

  return (
    <Form
      className="form-container"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await handleSubmit(signup);
        dispatch(addCurrentUser(data.newUser));
        if (user !== null) {
          history.push("/");
        }
      }}
    >
      <div className="input-container owner-name">
        <Form.Control
          type="text"
          placeholder="Your name"
          className="input-text-signup owner-name"
          value={signup?.myOwner.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "name")
          }
        />
        <Form.Control
          type="text"
          placeholder="Your surname"
          className="input-text-signup owner-name"
          value={signup?.myOwner.surname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "surname")
          }
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Your pet's name"
          className="input-text-signup"
          value={signup?.petName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "petName")
          }
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Username"
          className="input-text-signup"
          value={signup?.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "username")
          }
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Email"
          className="input-text-signup"
          value={signup?.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "email")
          }
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-text-signup"
          value={signup?.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "password")
          }
        />
      </div>

      <Button className="submit-btn" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default withRouter(FormSignup);
