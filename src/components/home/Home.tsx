import { RouteComponentProps } from "react-router-dom";
import Navbar from "../Navbar";
import SendPost from "../posts/SendPosts";
import { getAllPosts } from "../posts/postLogic";
import "./home.css";
import { useEffect, useState } from "react";
import { postInt, reduxStateInt } from "../../utils/interfaces";
import SinglePost from "../posts/SinglePost";
import { Spinner } from "react-bootstrap";
import { sendRequestWithToken } from "../../utils/commonLogic";
import OnlineUsers from "./OnlineUsers";
import { FaPaw } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = (props: RouteComponentProps) => {
  const [allPosts, setAllPosts] = useState<postInt[] | null>(null);
  const [loading, setLoading] = useState(false);

  const postsObject = useSelector((state: reduxStateInt) => state.posts);

  let selectedPost = postsObject.selectedPost;

  useEffect(() => {
    const setPosts = async () => {
      setLoading(true);
      let posts = await sendRequestWithToken(getAllPosts, props, "", "");
      if (posts) {
        setAllPosts(posts);
        setLoading(false);
      }
    };
    setPosts();
  }, [selectedPost]);

  useEffect(() => {
    console.log("Use Effect Home!!", allPosts);
  }, [allPosts]);
  return (
    <div className="home-container">
      <div className="top-logo-fixed-mobile">
        <FaPaw className="top-logo-fixed-icon" />
        <span className="title-top-logo-fixed">PetBook</span>
      </div>
      <div className="big-row-container">
        <div className="posts-container">
          <SendPost />
          {loading ? (
            <Spinner animation="border" className="post-loading-spinner" />
          ) : (
            ""
          )}
          {allPosts &&
            allPosts
              .sort(function (a: any, b: any) {
                return +new Date(b.createdAt) - +new Date(a.createdAt);
              })
              .map((p) => <SinglePost post={p} />)}
        </div>
        <div className="online-users-container">
          <OnlineUsers />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
