import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { withRouter, RouteComponentProps } from "react-router";
import { logInInt } from "../../utils/interfaces";

const FormLogin = ({ history }: RouteComponentProps) => {
  const [login, setLogin] = useState<logInInt | null>(null);

  return (
    <Form className="form-container" onSubmit={() => history.push("/")}>
      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Email"
          className="input-text"
          value={login?.email}
        />
        <FaUserAlt className="input-icon" />
      </div>

      <div className="input-container">
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-text"
          value={login?.password}
        />
        <FaLock className="input-icon" />
      </div>
      <div className="remember-me-cont">
        <Form.Check
          type="checkbox"
          label="Remember me"
          className="remember-me"
        />
        <span className="forgot-pass">Forgot password?</span>
      </div>
      <Button className="submit-btn" type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default withRouter(FormLogin);
