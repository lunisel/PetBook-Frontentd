import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { withRouter, RouteComponentProps } from "react-router";
import { signUpInt } from "../../utils/interfaces";

const FormSignup = ({ history }: RouteComponentProps) => {
  const [signup, setSignup] = useState<signUpInt | null>(null);

  return (
    <Form className="form-container" onSubmit={() => history.push("/")}>
      <div className="input-container owner-name">
        <Form.Control
          type="text"
          placeholder="Your name"
          className="input-text-signup owner-name"
          value={signup?.owner.name}
        />
        <Form.Control
          type="text"
          placeholder="Your surname"
          className="input-text-signup owner-name"
          value={signup?.owner.surname}
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Your pet's name"
          className="input-text-signup"
          value={signup?.name}
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Username"
          className="input-text-signup"
          value={signup?.username}
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Email"
          className="input-text-signup"
          value={signup?.email}
        />
      </div>

      <div className="input-container">
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-text-signup"
          value={signup?.password}
        />
      </div>
      
      <Button className="submit-btn" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default withRouter(FormSignup);
