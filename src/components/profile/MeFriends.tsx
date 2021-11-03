import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { friendsInt, reduxStateInt } from "../../utils/interfaces";
import SingleFriend from "./SingleFriend"

const MeFriends = (props: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const following: friendsInt[] = user!.following;
  const followers: friendsInt[] = user!.followers;

  return (
    <div className="friends-cont-big">
      <div className="following-followers-cont">
        <h4 className="following-title">{following.length} FOLLOWING</h4>
        {following.map((f, i) => (
          <div className="following-content-container" key={i}>
            <SingleFriend userId={f.user} props={props}/>
          </div>
        ))}
      </div>
      <div className="following-followers-cont">
        <h4 className="following-title">{followers.length} FOLLOWERS</h4>
        {followers.map((f, i) => (
          <div className="followers-content-container" key={i}>
            <SingleFriend userId={f._id} props={props}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(MeFriends);
