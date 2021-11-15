import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { logInInt, userInt } from "../../utils/interfaces";
import { handleSubmit, handleOnChange } from "./loginLogic";
import { addCurrentUser } from "../../redux/actions/user";

const FormLogin = ({ history }: RouteComponentProps) => {
  const [login, setLogin] = useState<logInInt>({
    email: "",
    password: "",
    stayConnected: true
  });

  const [validated, setValidation] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch();

  return (
    <Form
      className="form-container"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const user: userInt = await handleSubmit(login);
        if (user) {
          dispatch(addCurrentUser(user));
          history.push("/");
        } else {
          setLoading(false)
          setValidation(true);
        }
      }}
    >
      {validated ? (
        <Alert variant="danger">Something went wrong, try again!</Alert>
      ) : (
        ""
      )}
      <div className="input-container">
        <Form.Control
          type="text"
          placeholder="Email"
          className="input-text"
          defaultValue={login?.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "email", login, setLogin)
          }
        />
        <FaUserAlt className="input-icon" />
      </div>

      <div className="input-container">
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-text"
          defaultValue={login?.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, "password", login, setLogin)
          }
        />
        <FaLock className="input-icon" />
      </div>
      <div className="remember-me-cont">
        <Form.Check
          type="checkbox"
          checked
          label="Remember me"
          className="remember-me"
          onChange={()=> setLogin({
            ...login,
            stayConnected: !login.stayConnected
          })}
        />
        <span className="forgot-pass">Forgot password?</span>
      </div>
      <Button className="submit-btn" type="submit">
        {loading ? <Spinner animation="border" variant="light" /> : "Log In"}
      </Button>
    </Form>
  );
};

export default withRouter(FormLogin);
