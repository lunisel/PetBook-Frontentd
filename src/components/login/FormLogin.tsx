import { Button, Form } from "react-bootstrap";
import { FaUserAlt, FaLock } from "react-icons/fa";

const FormLogin = () => {
  return (
    <Form className="form-container">
      <div className="input-container">
        <Form.Control type="text" placeholder="Email" className="input-text" />
        <FaUserAlt className="input-icon" />
      </div>

      <div className="input-container">
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-text"
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

export default FormLogin;
