import { postInt, reduxStateInt } from "../../utils/interfaces";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./post.css";
import { useSelector } from "react-redux";

const SinglePost = ({ post }: any) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const user = post.user;
  const date = new Date(post.updatedAt);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

  return (
    <div className="single-post-container">
      <div className="post-info-row">
        <div className="post-avatar-container">
          <img src={user.avatar} alt="pet-avatar" className="post-avatar" />
        </div>
        <div className="post-user-info-cont">
          <span className="post-user-name">{user.petName}</span>
          <span className="post-user-username">@{user.username}</span>
          <span className="post-timestamp">{`${d}/${m}/${y}\n ${h}:${min}`}</span>
        </div>
        {currentUser?.username === user.username ? <BsThreeDotsVertical className="post-three-dots" /> : ""}
      </div>
      <div className="post-text-container">
        <span className="post-text">{post.content.text}</span>
      </div>
    </div>
  );
};

export default SinglePost;
