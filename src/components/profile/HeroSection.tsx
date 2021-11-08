import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { addCurrentUser } from "../../redux/actions/user";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { friendsInt, reduxStateInt, userInt } from "../../utils/interfaces";
import { addFriends, removeFriends } from "../feed/feedLogic";
import { fetchProfileFromUsername } from "./profileLogic";

interface heroSectionInt {
  pages: any;
  setPages: any;
  routerProps: RouteComponentProps;
  user: userInt;
}

const HeroSection = (props: heroSectionInt) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [friend, setFriend] = useState(false)

  const dispatch = useDispatch()

  let user = props.user;
  let pages = props.pages;
  let setPages = props.setPages;
  let followers: friendsInt[] = user.followers;
  let filter = followers.filter((u) => u._id === currentUser?._id).length > 0;

  return (
    <div className="hero-profile">
      <div className="hero-profile-content-cont">
        <div className="avatar-container">
          <img
            src={user.avatar}
            alt="pet-avatar"
            className="avatar-me-page img-fluid"
          />
        </div>
        <h4 className="me-page-name">{user?.petName}</h4>
        <span className="me-page-username">@{user?.username}</span>
        {filter || friend ? (
          <span
            className="remove-friend-icon-profile"
            onClick={async () => {
              let data = await sendRequestWithToken(
                removeFriends,
                props.routerProps,
                user._id!,
                ""
              );
              if (data) {
                dispatch(addCurrentUser(data));
                setFriend(false);
                window.location.reload()
              }
            }}
          >Unfollow</span>
        ) : (
          <span
            className="add-friend-icon-profile"
            onClick={async () => {
              let data = await sendRequestWithToken(
                addFriends,
                props.routerProps,
                user._id!,
                ""
              );
              if (data) {
                dispatch(addCurrentUser(data));
                setFriend(true);
              }
            }}
          >Follow</span>
        )}
      </div>

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
