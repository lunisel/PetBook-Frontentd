import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { reduxStateInt, userInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import { fetchProfileFromUsername } from "./profileLogic";

const FriendsProfile = (props: RouteComponentProps) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [user, setUser] = useState<userInt | null>(null);

  let username = props.location.pathname;
  useEffect(() => {
    const fetchProfile = async () => {
      let data = await fetchProfileFromUsername(username);
      if (data) setUser(data);
    };
    fetchProfile();
  }, []);

  const dispatch = useDispatch();

  const [newAvatar, setNewAvatar] = useState<any>(null);
  const [avatarPreview, setPreview] = useState<any>(null);

  const [pages, setPages] = useState({
    posts: true,
    informations: false,
    friends: false,
    photos: false,
  });

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
        {user && console.log(user)}
        {user && (
          <HeroSection
            pages={pages}
            setPages={setPages}
            props={props}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default FriendsProfile;
