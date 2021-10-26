import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { disconnectUser } from "../redux/actions/user";
import {
  FaPaw,
  FaHome,
  FaUserCircle,
  FaBook,
  FaNewspaper,
} from "react-icons/fa";
import { IoIosPaperPlane } from "react-icons/io";
import { useEffect, useState } from "react";

const Navbar = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [vw, setVW] = useState<Number>(window.innerWidth);

  const updateWindowDimensions = () => {
    const newWidth = window.innerWidth;
    setVW(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div className="nav-container">
      <FaPaw className={vw <= 1000 ? " d-none" : "nav-icon"} />
      <h3 className={vw <= 1000 ? " d-none" : "text-logo-nav"}>PetBook</h3>
      <Link
        to="/"
        className={
          location.pathname === "/" ? "link-container active" : "link-container"
        }
      >
        <FaHome className="link-icon-nav" />
        <div
          className={
            (location.pathname === "/" ? "link-nav active" : "link-nav") +
            (vw <= 1000 ? " d-none" : "")
          }
        >
          Home
        </div>
      </Link>

      <Link
        to="/me"
        className={
          location.pathname === "/me"
            ? "link-container active"
            : "link-container"
        }
      >
        <FaUserCircle className="link-icon-nav" />

        <div
          className={
            (location.pathname === "/me" ? "link-nav active" : "link-nav") +
            (vw <= 1000 ? " d-none" : "")
          }
        >
          My Profile
        </div>
      </Link>
      <Link
        to="/notes"
        className={
          location.pathname === "/notes"
            ? "link-container active"
            : "link-container"
        }
      >
        <FaBook className="link-icon-nav" />
        <div
          className={
            (location.pathname === "/notes" ? "link-nav active" : "link-nav") +
            (vw <= 1000 ? " d-none" : "")
          }
        >
          Notes
        </div>
      </Link>
      <Link
        to="/feed"
        className={
          location.pathname === "/feed"
            ? "link-container active"
            : "link-container"
        }
      >
        <FaNewspaper className="link-icon-nav" />
        <div
          className={
            (location.pathname === "/feed" ? "link-nav active" : "link-nav") +
            (vw <= 1000 ? " d-none" : "")
          }
        >
          Feed
        </div>
      </Link>
      <Link
        to="/messages"
        className={
          location.pathname === "/messages"
            ? "link-container active"
            : "link-container"
        }
      >
        <IoIosPaperPlane className="link-icon-nav" />
        <div
          className={
            (location.pathname === "/messages"
              ? "link-nav active"
              : "link-nav") + (vw <= 1000 ? " d-none" : "")
          }
        >
          Messages
        </div>
      </Link>

      <BiLogOut
        className="log-out-icon"
        onClick={() => {
          dispatch(disconnectUser());
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }}
      />
    </div>
  );
};

export default withRouter(Navbar);
