import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { FaPhotoVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { reduxStateInt, sendPostInt } from "../../utils/interfaces";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { RouteComponentProps, withRouter } from "react-router";
import { addImgToPost } from "./postLogic";

const SendPosts = (props: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const [newPost, setNewPost] = useState<sendPostInt>({
    content: {
      text: "",
    },
  });

  const [avatarPreview, setPreview] = useState<string | null>(null);

  const inputFile = useRef<any>(null);

  const openFileDialog = () => {
    inputFile.current.click();
  };

  const sendPost = async (post: sendPostInt) => {
    console.log(post)
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post!),
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="send-post-big-container">
      <div className="form-container-home">
        <div className="send-post-img-cont">
          <img src={user?.avatar} alt="paw" className="img-profile" />
        </div>

        <Form.Control
          type="text"
          placeholder="Write something..."
          className="input-send-post"
          value={newPost?.content.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewPost({
              content: {
                text: e.target.value,
              },
            });
          }}
          onKeyPress={async (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              let data = await sendRequestWithToken(
                sendPost,
                props,
                newPost,
                ""
              );
              if (data) window.location.reload();
            }
          }}
        />
        <FaPhotoVideo
          className="add-pic-icon"
          onClick={() => openFileDialog()}
        />
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            addImgToPost(e, setPreview, setNewPost, newPost);
          }}
        />
      </div>
      {avatarPreview && (
        <img src={avatarPreview} alt="" className="preview-post-img" />
      )}
    </div>
  );
};

export default withRouter(SendPosts);
