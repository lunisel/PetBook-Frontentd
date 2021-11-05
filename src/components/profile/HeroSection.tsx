import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { userInt } from "../../utils/interfaces";
import { fetchProfileFromUsername } from "./profileLogic";

interface heroSectionInt {
  pages: any;
  setPages: any;
  props: RouteComponentProps;
  user: userInt;
}

const HeroSection = (props: heroSectionInt) => {
  let user = props.user;
  let pages = props.pages;
  let setPages = props.setPages;

  return (
    <div className="hero-profile">
      <div className="avatar-container">
        <img
          src={user.avatar}
          alt="pet-avatar"
          className="avatar-me-page img-fluid"
        />
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
          className={pages.friends ? "me-page-links active" : "me-page-links"}
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
          className={pages.photos ? "me-page-links active" : "me-page-links"}
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
  );
};

export default HeroSection;
