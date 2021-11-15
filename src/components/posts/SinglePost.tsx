import { reduxStateInt } from "../../utils/interfaces";
import { BsThreeDotsVertical, BsAspectRatio } from "react-icons/bs";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  deletePosts,
  postNewComment,
  likePost,
  dislikePost,
  getTime,
} from "./postLogic";
import { Modal } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { Link } from "react-router-dom";
import SinglePostComments from "./SinglePostComments";
import { addSelectedPost, deleteSelectedPost } from "../../redux/actions/post";
import "./post.css";

const SinglePost = ({ post }: any, props: RouteComponentProps) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const selectedPost = useSelector(
    (state: reduxStateInt) => state.posts.selectedPost
  );

  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [imgHovered, setImgHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const user = post.user;
  const postTime = getTime(post.createdAt);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    dispatch(addSelectedPost(post));
    if (selectedPost) setShow(true);
  };

  return (
    <div className="single-post-container">
      <div className="post-info-row">
        <div className="post-avatar-container">
          <img src={user.avatar} alt="pet-avatar" className="post-avatar" />
        </div>
        <div className="post-user-info-cont">
          <Link
            to={
              user.username === currentUser?.username
                ? `/me`
                : `/profile/${user.username}`
            }
            className="post-user-name"
          >
            {user.petName}
          </Link>
          <span className="post-user-username">@{user.username}</span>
          <span className="post-timestamp">{postTime}</span>
        </div>
        {currentUser?.username === user.username ? (
          <BsThreeDotsVertical
            className="post-three-dots"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          />
        ) : (
          ""
        )}
        {dropdown ? (
          <div className="dropdown-container">
            <div
              className="post-list-container"
              onClick={async () => {
                await sendRequestWithToken(deletePosts, props, post._id, "");
              }}
            >
              <span className="dropdown-link-post">
                <VscTrash className="post-trash-icon mr-3" />
                Delete
              </span>
            </div>
            <div className="post-list-container" onClick={() => handleShow()}>
              <span className="dropdown-link-post">
                <VscEdit className="post-trash-icon mr-3" />
                Modify
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="post-text-container">
        <span className="post-text">{post.content.text}</span>
      </div>
      {post.content.img ? (
        <div
          className="img-post-container"
          onMouseOver={() => setImgHovered(true)}
          onMouseOut={() => setImgHovered(false)}
        >
          <img
            src={post.content.img}
            alt="post-cover"
            className="img-post"
            onClick={() => handleShow()}
          />
          <BsAspectRatio
            className={imgHovered ? "open-img-post-icon" : "d-none"}
          />
        </div>
      ) : (
        ""
      )}
      {post.likes.length !== 0 ? (
        liked ? (
          post.likes.includes(currentUser?._id?.toString()) ? (
            <div className="post-likes-container">
              {post.likes.length} Likes
            </div>
          ) : (
            <div className="post-likes-container">
              {post.likes.length + 1} Likes
            </div>
          )
        ) : (
          <div className="post-likes-container">{post.likes.length} Likes</div>
        )
      ) : liked ? (
        <div className="post-likes-container">
          {post.likes.length + 1} Likes
        </div>
      ) : (
        ""
      )}
      <div className="post-like-comment-buttons-cont">
        <div
          className={
            post.likes.includes(currentUser?._id?.toString()) || liked
              ? "post-like-comment-btn active"
              : "post-like-comment-btn"
          }
          onClick={
            post.likes.includes(currentUser?._id?.toString()) || liked
              ? async () => {
                  let data = await sendRequestWithToken(
                    dislikePost,
                    props,
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
                    props,
                    post._id,
                    ""
                  );
                  if (data) {
                    setLiked(true);
                  }
                }
          }
        >
          {post.likes.includes(currentUser?._id?.toString()) || liked ? (
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

        <div className="post-like-comment-btn" onClick={() => handleShow()}>
          <FaRegComment className="like-comment-icon" />
          Comment
        </div>
      </div>

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
                    user.username === currentUser?.username
                      ? `/me`
                      : `/profile/${user.username}`
                  }
                  className="post-user-name"
                >
                  {user.petName}
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

            {post.likes.length !== 0 ? (
              <div className="post-likes-container">
                {post.likes.length} Likes
              </div>
            ) : (
              ""
            )}

            <div className="post-like-comment-buttons-cont">
              <div
                className={
                  post.likes.includes(currentUser?._id?.toString()) || liked
                    ? "post-like-comment-btn active"
                    : "post-like-comment-btn"
                }
                onClick={
                  post.likes.includes(currentUser?._id?.toString()) || liked
                    ? async () => {
                        let data = await sendRequestWithToken(
                          dislikePost,
                          props,
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
                          props,
                          post._id,
                          ""
                        );
                        if (data) {
                          setLiked(true);
                        }
                      }
                }
              >
                {post.likes.includes(currentUser?._id?.toString()) || liked ? (
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
                      props,
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
    </div>
  );
};

export default withRouter(SinglePost);
