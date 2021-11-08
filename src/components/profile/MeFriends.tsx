import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { friendsInt, reduxStateInt, userInt } from "../../utils/interfaces";
import SingleFriend from "./SingleFriend";

interface meFriendsPropsInt {
  routerProps: RouteComponentProps;
  user: userInt | null;
}
const MeFriends = (props: meFriendsPropsInt) => {

  const [following, setFollowing] = useState<friendsInt[] | null>(null)
  const [followers, setFollowers] = useState<friendsInt[] | null>(null)

  const setFollowersAndFollowing = () => {
    setFollowing(props.user!.following)
    setFollowers(props.user!.followers)
  };
  useEffect(() => {
    setFollowersAndFollowing()
  }, [props.user]);

  return (
    <div className="friends-cont-big">
      <div className="following-followers-cont">
        <h4 className="following-title">{following?.length} FOLLOWING</h4>
        {following && following.map((f, i) => (
          <div className="following-content-container" key={i}>
            <SingleFriend userId={f.user} props={props.routerProps} />
          </div>
        ))}
      </div>
      <div className="following-followers-cont">
        <h4 className="following-title">{followers?.length} FOLLOWERS</h4>
        {followers && followers.map((f, i) => (
          <div className="followers-content-container" key={i}>
            <SingleFriend userId={f._id} props={props.routerProps} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeFriends;
