import { postInt, reduxStateInt } from "../../utils/interfaces";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import "./post.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deletePosts } from "./postLogic";
import { Button, Modal } from "react-bootstrap";

const SinglePost = ({ post }: any) => {
  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [dropdown, setDropdown] = useState(false);
  const [show, setShow] = useState(false);

  const user = post.user;
  const date = new Date(post.updatedAt);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

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
              onClick={() => deletePosts(post._id)}
            >
              <span className="dropdown-link-post">
                <VscTrash className="post-trash-icon mr-3" />
                Delete
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

      <Modal show={show} onHide={handleClose} className="big-modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SinglePost;
