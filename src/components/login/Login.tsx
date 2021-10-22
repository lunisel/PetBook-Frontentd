import { RouteComponentProps } from "react-router";
import { FaPaw } from "react-icons/fa";
import FormLogin from "./FormLogin";
import "./styles.css";

const Login = ({ history }: RouteComponentProps) => {
  return (
    <div className="big-container">
      <div className="content-container">
        <div className="cover-content">
          <FaPaw className="paw-icon" />
          <span className="welcome-text">Welcome back to</span>
          <h1 className="text-logo">PetBook</h1>
        </div>
        <div className="form-content">
          <h1 className="login-title">Log In</h1>
          <FormLogin />
          <span className="link-to-registration">
            New here?{" "}
            <span className="orange" onClick={() => history.push("/signup")}>
              Create an account
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
