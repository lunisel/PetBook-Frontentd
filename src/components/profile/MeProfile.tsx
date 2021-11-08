import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { reduxStateInt, userInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import MePosts from "./MePosts";
import MeInformation from "./MeInformation";
import MeFriends from "./MeFriends"
import { GoDeviceCamera, GoCheck } from "react-icons/go";
import "./profile.css";
import { useEffect, useRef, useState } from "react";
import { changeImg, handleSubmit } from "./profileLogic";
import { addCurrentUser } from "../../redux/actions/user";
import { sendRequestWithToken } from "../../utils/commonLogic";

const MePage = (props: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const inputFile = useRef<any>(null);

  const dispatch = useDispatch()

  const [imgHovered, setImgHovered] = useState(false)
  const [avatarPreview, setPreview] = useState<string | null>(null)
  const [updatedUser, setUpdatedUser] = useState<any>(null)

  const [pages, setPages] = useState({
    posts: true,
    informations: false,
    friends: false,
    photos: false,
  });

  const openFileDialog = () =>{
    inputFile.current.click();
  }



  useEffect(()=>{
    const updateAvatar = async () => {
      let data = await sendRequestWithToken(handleSubmit, props, updatedUser, "")
      if(data){
        dispatch(addCurrentUser(data))
        window.location.reload()
      }
    }
    updateAvatar()
  },[updatedUser !== null])
  return (
    <div className="me-page-big-cont">
      <div className="profile-container">
        <div className="hero-profile">
          <div className="avatar-container" onClick={() => openFileDialog()} onMouseOver={()=> setImgHovered(true)} onMouseOut={()=> setImgHovered(false)}>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeImg(e, setPreview, setUpdatedUser, "avatar")
              }}
            />
            <img
              src={avatarPreview ? avatarPreview : user?.avatar}
              alt="pet-avatar"
              className="avatar-me-page img-fluid"
            />
            {imgHovered && <GoDeviceCamera className="camera-icon"/>}
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
        {pages.posts && <MePosts user={user} routerProps={props}/>}
        {pages.informations && <MeInformation />}
        {pages.friends && <MeFriends user={user} routerProps={props}/>}
      </div>
      <Navbar />
    </div>
  );
};

export default MePage;
