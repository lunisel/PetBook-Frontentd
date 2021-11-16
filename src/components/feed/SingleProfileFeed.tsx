import { useState } from "react";
import {
  MdOutlinePersonAddAlt,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import {addFriends} from "./feedLogic"
import {sendRequestWithToken} from "../../utils/commonLogic"
import { RouteComponentProps, withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser } from "../../redux/actions/user";
import { friendsInt, reduxStateInt } from "../../utils/interfaces";
import { Link } from "react-router-dom";

const SingleProfileFeed = (componentProp: any, props: RouteComponentProps) => {

    const [friend, setFriend] = useState(false)

    const currentUser = useSelector((state: reduxStateInt) => state.user.currentUser);

    const dispatch = useDispatch()

    let user = componentProp.user
    let followers : friendsInt[] = user.followers
    let filter = followers.filter(u=> u._id === currentUser?._id).length > 0
    console.log(filter)

  return (
    <div className="user-searched-cont">
      <div className="avatar-container-feed">
        <img
          src={user.avatar}
          alt="pet-avatar"
          className="searched-user-avatar"
        />
      </div>
      <div className="user-name-cont">
      <Link
            to={
              user.username === currentUser?.username
                ? `/me`
                : `/profile/${user.username}`
            }
            className="searched-user-name"
          >
            {user.petName}
          </Link>
        <span className="searched-user-username">@{user.username}</span>
      </div>
      <div className="add-remove-friend-cont">
        {user._id === currentUser?._id ? "" : (filter || friend ? (
          <MdOutlinePersonAddDisabled
            className="remove-friend-icon-feed"
            onClick={() => setFriend(false)}
          />
        ) : (
          <MdOutlinePersonAddAlt
            className="add-friend-icon-feed"
            onClick={async () => {
                let data = await sendRequestWithToken(addFriends, props ,user._id!, "")
                if(data) {
                    dispatch(addCurrentUser(data))
                    setFriend(true)
                }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default withRouter(SingleProfileFeed);
