import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { reduxStateInt, userInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import MePosts from "./MePosts";
import MeInformation from "./MeInformation";
import { GoDeviceCamera, GoCheck } from "react-icons/go";
import "./profile.css";
import { useRef, useState } from "react";
import { handleFileUpload } from "./profileLogic";
import { addCurrentUser } from "../../redux/actions/user";

const MePage = ({ history }: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const inputFile = useRef<any>(null);

  const dispatch = useDispatch()

  const [newAvatar, setNewAvatar] = useState<any>(null)
  const [avatarPreview, setPreview] = useState<any>(null)

  const [pages, setPages] = useState({
    posts: true,
    informations: false,
    friends: false,
    photos: false,
  });

  const setImgPreview = () => {
    const reader = new FileReader()
    reader.readAsDataURL(newAvatar)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
  }

  const changeImg = () => {
    inputFile.current.click();
  };

  return (
    <div className="me-page-big-cont">
      <div className="profile-container">
        <div className="hero-profile">
          <div className="avatar-container" onClick={() => changeImg()}>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAvatar(e.target.files![0])
                if(newAvatar) setImgPreview()
                /* if(newUser){
                  dispatch(addCurrentUser(newUser))
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                } */
              }}
            />
            <img
              src={avatarPreview ? newAvatar.name : user?.avatar}
              alt="pet-avatar"
              className="avatar-me-page img-fluid"
            />
            {newAvatar ? <GoCheck className="check-icon-avatar"/> :<GoDeviceCamera className="camera-icon" />}
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
        {pages.posts && <MePosts />}
        {pages.informations && <MeInformation />}
      </div>
      <Navbar />
    </div>
  );
};

export default MePage;
