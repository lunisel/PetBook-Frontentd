import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaPhotoVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { reduxStateInt, sendPostInt } from "../../utils/interfaces";

const SendPosts = () => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const [newPost, setNewPost] = useState<sendPostInt>({
    content:{
        text: ""
    }
  })

  const sendPost = async (post: sendPostInt) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post!),
      });
      if (response.ok) {
        let data = await response.json();
        console.log("new post ->", data);
        setNewPost({
            content:{
                text: ""
            }
        })
        window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container-home">
      <img src={user?.avatar} alt="paw" className="img-profile" />
      <Form.Control
        type="text"
        placeholder="Write something..."
        className="input-send-post"
        value={newPost?.content.text}
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
            setNewPost({
                content:{
                    text: e.target.value
                }
            })
        }}
        onKeyPress={(e: React.KeyboardEvent) => {
            if(e.key === "Enter"){
                sendPost(newPost)
            }
        }}
      />
      <FaPhotoVideo className="add-pic-icon" />
    </div>
  );
};

export default SendPosts;