import { commentsInt, reduxStateInt } from "../../utils/interfaces";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import "./post.css";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { deletePosts, postNewComment } from "./postLogic";
import { Modal } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import { sendRequestWithToken } from "../../utils/commonLogic";

const SinglePost = ({ post }: any, props: RouteComponentProps) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [dropdown, setDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState<string>("");

  const user = post.user;
  const comments: commentsInt[] = post.comments;
  const date = new Date(post.updatedAt);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();
  const postTime = `${d}/${m}/${y}\n ${h}:${min}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div
              className="post-list-container"
              onClick={() => {
                handleShow();
              }}
            >
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
        <div className="img-post-container">
          <img
            src={post.content.img}
            alt="post-cover"
            className="img-post"
            onClick={() => handleShow()}
          />
        </div>
      ) : (
        ""
      )}
      {post.likes.length !== 0 ? (
        <div className="post-likes-container">{post.likes.length} Likes</div>
      ) : (
        ""
      )}
      <div className="post-like-comment-buttons-cont">
        <div className="post-like-comment-btn">
          <FaRegThumbsUp className="like-comment-icon" />
          Like
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
          <div
            className={
              post.content.img
                ? "modal-post-container with-left-border"
                : "modal-post-container"
            }
          >
            <div className="modal-user-info-container">
              <div className="post-avatar-container mr-3">
                <img
                  src={post.user.avatar}
                  alt="pet-avatar"
                  className="post-avatar"
                />
              </div>

              <div className="post-user-info-cont">
                <span className="post-user-name">{post.user.petName}</span>
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
              <div className="post-like-comment-btn">
                <FaRegThumbsUp className="like-comment-icon" />
                Like
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
                    if (data) setComment("");
                  }
                }}
              />

              {comments.length !== 0
                ? comments.map((c) => (
                    <div className="modal-single-comment-cont">
                      <span className="modal-comment-text">{c.text}</span>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withRouter(SinglePost);
