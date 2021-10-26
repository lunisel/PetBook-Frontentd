import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { reduxStateInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import MePosts from "./MePosts"
import MeInformation from "./MeInformation"
import { GoDeviceCamera } from "react-icons/go";
import "./profile.css";
import { useState } from "react";

const MePage = ({ history }: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const [pages, setPages] = useState({
    posts: true,
    informations: false,
    friends: false,
    photos: false,
  });

  return (
    <div className="me-page-big-cont">
      <div className="profile-container">
        <div className="hero-profile">
          <div className="avatar-container">
            <img
              src={user?.avatar}
              alt="pet-avatar"
              className="avatar-me-page img-fluid"
            />
            <GoDeviceCamera className="camera-icon" />
          </div>
          <h4 className="me-page-name">{user?.petName}</h4>
          <span className="me-page-username">@{user?.username}</span>
          <div className="me-profile-nav-container">
            <span
              className={pages.posts ? "me-page-links active" : "me-page-links"}
              onClick={() =>
                setPages({
                  posts: true,
                  informations: false,
                  friends: false,
                  photos: false,
                })
              }
            >
              Posts
            </span>
            <span
              className={
                pages.informations ? "me-page-links active" : "me-page-links"
              }
              onClick={() =>
                setPages({
                  posts: false,
                  informations: true,
                  friends: false,
                  photos: false,
                })
              }
            >
              Information
            </span>
            <span
              className={
                pages.friends ? "me-page-links active" : "me-page-links"
              }
              onClick={() =>
                setPages({
                  posts: false,
                  informations: false,
                  friends: true,
                  photos: false,
                })
              }
            >
              Friends
            </span>
            <span
              className={
                pages.photos ? "me-page-links active" : "me-page-links"
              }
              onClick={() =>
                setPages({
                  posts: false,
                  informations: false,
                  friends: false,
                  photos: true,
                })
              }
            >
              Photos
            </span>
          </div>
        </div>
        {pages.posts && <MePosts/>}
        {pages.informations && <MeInformation/>}
      </div>
      <Navbar />
    </div>
  );
};

export default MePage;
