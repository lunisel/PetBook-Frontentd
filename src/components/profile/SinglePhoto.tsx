import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { BsAspectRatio } from "react-icons/bs";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addSelectedPost } from "../../redux/actions/post";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { postInt, reduxStateInt, userInt } from "../../utils/interfaces";
import {
  dislikePost,
  getTime,
  likePost,
  postNewComment,
} from "../posts/postLogic";
import SinglePostComments from "../posts/SinglePostComments";
import { RouteComponentProps } from "react-router-dom";

interface singlePhotosPropsInt {
  i: number;
  p: postInt;
  user: userInt | null;
  routerProps: RouteComponentProps;
}

const SinglePhoto = (props: singlePhotosPropsInt) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [liked, setLiked] = useState(false);

  const selectedPost = useSelector(
    (state: reduxStateInt) => state.posts.selectedPost
  );

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const user = props.user;

  const post = props.p;

  const dispatch = useDispatch();

  const postTime = getTime(post!.createdAt);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    dispatch(addSelectedPost(post));
    if (selectedPost) setShow(true);
  };
  return (
    <>
      <Col
        xs={12}
        md={4}
        lg={3}
        key={props.i}
        className="profile-photos-img-container"
      >
        <img
          src={props.p.content.img}
          alt=""
          className="profile-photos-img"
          onClick={() => handleShow()}
        />
      </Col>

      <Modal show={show} onHide={handleClose} className="big-modal-container">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {post.content.img ? (
            <div className="img-modal-cont">
              <img
                src={post.content.img}
                alt="post-cover"
                className="img-modal-big"
              />
            </div>
          ) : (
            ""
          )}
          <div className="modal-post-container">
            <div className="modal-user-info-container">
              <div className="post-avatar-container mr-3">
                <img
                  src={post.user.avatar}
                  alt="pet-avatar"
                  className="post-avatar"
                />
              </div>

              <div className="post-user-info-cont">
                <Link
                  to={
                    user?.username === currentUser?.username
                      ? `/me`
                      : `/profile/${user?.username}`
                  }
                  className="post-user-name"
                >
                  {user?.petName}
                </Link>
                <span className="post-user-username">
                  @{post.user.username}
                </span>
                <span className="post-timestamp">{postTime}</span>
              </div>
            </div>

            <div className="modal-post-text-container">
              <span className="post-text">{post.content.text}</span>
            </div>

            {post.likes?.length !== 0 ? (
              <div className="post-likes-container">
                {post.likes?.length} Likes
              </div>
            ) : (
              ""
            )}

            <div className="post-like-comment-buttons-cont">
              <div
                className={
                  post.likes?.includes(currentUser?._id!) || liked
                    ? "post-like-comment-btn active"
                    : "post-like-comment-btn"
                }
                onClick={
                  post.likes?.includes(currentUser?._id!) || liked
                    ? async () => {
                        let data = await sendRequestWithToken(
                          dislikePost,
                          props.routerProps,
                          post._id,
                          ""
                        );
                        if (data) {
                          setLiked(false);
                        }
                      }
                    : async () => {
                        let data = await sendRequestWithToken(
                          likePost,
                          props.routerProps,
                          post._id,
                          ""
                        );
                        if (data) {
                          setLiked(true);
                        }
                      }
                }
              >
                {post.likes?.includes(currentUser?._id!) || liked ? (
                  <>
                    <FaRegThumbsUp className="like-comment-icon active" />
                    Liked
                  </>
                ) : (
                  <>
                    <FaRegThumbsUp className="like-comment-icon" />
                    Like
                  </>
                )}
              </div>

              <div
                className="post-like-comment-btn"
                onClick={() => handleShow()}
              >
                <FaRegComment className="like-comment-icon" />
                Comment
              </div>
            </div>

            <div className="modal-comments-big-container">
              <input
                type="text"
                className="modal-post-comment-input"
                value={comment}
                placeholder="Write your comment here..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setComment(e.target.value);
                }}
                onKeyPress={async (e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    let data = await sendRequestWithToken(
                      postNewComment,
                      props.routerProps,
                      post._id,
                      comment
                    );
                    if (data) {
                      dispatch(addSelectedPost(data));
                      setComment("");
                    }
                  }
                }}
              />

              <SinglePostComments />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SinglePhoto;
