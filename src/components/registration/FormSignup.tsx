import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { signUpInt } from "../../utils/interfaces";
import { handleSubmit, handleOnChange } from "./signupLogic";
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

  const [validated, setValidation] = useState<boolean>(false);

  const dispatch = useDispatch();

  return (
    <Form
      className="form-container"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await handleSubmit(signup);
        if (data) {
          dispatch(addCurrentUser(data.newUser));
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else {
          setValidation(true);
        }
      }}
    >
      {validated ? <Alert variant="danger">Fill all fields !</Alert> : ""}
      <div className="input-container owner-name">
        <Form.Control
          type="text"
          placeholder="Your name"
          className="input-text-signup owner-name"
          value={signup?.myOwner.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "name", signup, setSignup)
          }
        />
        <Form.Control
          type="text"
          placeholder="Your surname"
          className="input-text-signup owner-name"
          value={signup?.myOwner.surname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "surname", signup, setSignup)
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
            handleOnChange(e, "petName", signup, setSignup)
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
            handleOnChange(e, "username", signup, setSignup)
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
            handleOnChange(e, "email", signup, setSignup)
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
            handleOnChange(e, "password", signup, setSignup)
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
