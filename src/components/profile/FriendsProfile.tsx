import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { reduxStateInt, userInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import MeFriends from "./MeFriends";
import MePosts from "./MePosts";
import FriendsInformation from "./FriendsInformation";
import { fetchProfileFromUsername } from "./profileLogic";
import ProfilePhotos from "./ProfilePhotos";

const FriendsProfile = (props: RouteComponentProps) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [newAvatar, setNewAvatar] = useState<any>(null);
  const [avatarPreview, setPreview] = useState<any>(null);
  const [user, setUser] = useState<userInt | null>(null);
  const [pages, setPages] = useState({
    posts: true,
    informations: false,
    friends: false,
    photos: false,
  });

  let username = props.location.pathname;
  useEffect(() => {
    const fetchProfile = async () => {
      let data = await fetchProfileFromUsername(username);
      if (data) setUser(data);
    };
    fetchProfile();
  }, [username]);

  const dispatch = useDispatch();

  const setImgPreview = () => {
    const reader = new FileReader();
    reader.readAsDataURL(newAvatar);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  return (
    <div className="big-friend-profile-container">
      <Navbar />
      <div className="friend-profile-cont">
        {user && (
          <>
            <HeroSection
              pages={pages}
              setPages={setPages}
              props={props}
              user={user}
            />
            {pages.posts && <MePosts user={user} routerProps={props} />}
            {pages.friends && <MeFriends user={user} routerProps={props} />}
            {pages.informations && (
              <FriendsInformation user={user} routerProps={props} />
            )}
            {pages.photos && <ProfilePhotos user={user} routerProps={props} />}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsProfile;
