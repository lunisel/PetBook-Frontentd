import { useEffect, useState } from "react";
import { friendsInt, reduxStateInt, userInt } from "../../utils/interfaces";
import {
  MdOutlinePersonAddAlt,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { addCurrentUser } from "../../redux/actions/user";
import { addFriends, removeFriends } from "../feed/feedLogic";
import { RouteComponentProps } from "react-router";

interface singleFriendInt {
  userId: string;
  props: RouteComponentProps;
}

const SingleFriend = ({ userId, props }: singleFriendInt) => {
  const [user, setUser] = useState<userInt | null>(null);

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  let followers: friendsInt[] = currentUser!.followers;
  let following: friendsInt[] = currentUser!.following;
  let filter = following.filter((u) => u.user === user?._id).length > 0;

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/friend/${userId}`
      );
      let data = await response.json();
      if (data) setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  },[following]);
  return (
    <>
      <img src={user?.avatar} alt="" className="friend-avatar" />
      <div className="friend-username">@{user?.username}</div>
      {user?._id === currentUser?._id ? "" : (filter ? (
        <MdOutlinePersonAddDisabled
          className="remove-friend-icon-feed mr-3"
          style={{ height: "2.5rem", width: "2.5rem" }}
          onClick={async () => {
            let data = await sendRequestWithToken(
              removeFriends,
              props,
              userId,
              ""
            );
            if (data) {
              dispatch(addCurrentUser(data));
            }
          }}
        />
      ) : (
        <MdOutlinePersonAddAlt
          style={{ height: "2.5rem", width: "2.5rem" }}
          className="add-friend-icon-feed mr-3"
          onClick={async () => {
            let data = await sendRequestWithToken(
              addFriends,
              props,
              userId,
              ""
            );
            if (data) {
              dispatch(addCurrentUser(data));
            }
          }}
        />
      ))}
    </>
  );
};

export default SingleFriend;
