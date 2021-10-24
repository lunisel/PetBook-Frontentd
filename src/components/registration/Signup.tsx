import { RouteComponentProps } from "react-router";
import { FaPaw } from "react-icons/fa";
import FormSignup from "./FormSignup";
import "./signup.css";

const Signup = ({ history }: RouteComponentProps) => {
  return (
    <div className="big-container">
      <div className="content-container">
        <div className="cover-content">
          <FaPaw className="paw-icon" />
          <span className="welcome-text">Welcome to</span>
          <h1 className="text-logo">PetBook</h1>
        </div>
        <div className="form-content">
          <h1 className="signup-title">Create an Account</h1>
          <FormSignup />
          <span className="link-to-registration">
            Already have an account?{" "}
            <span className="orange" onClick={() => history.push("/login")}>
              Log In
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
