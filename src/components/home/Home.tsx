import { RouteComponentProps } from "react-router-dom";
import Navbar from "../Navbar";
import SendPost from "../posts/SendPosts";
import { getAllPosts } from "../posts/postLogic";
import "./home.css";
import { useEffect, useState } from "react";
import { postInt } from "../../utils/interfaces";
import SinglePost from "../posts/SinglePost";
import { Spinner } from "react-bootstrap";
import {sendRequestWithToken} from "../../utils/commonLogic"

const Home = (props: RouteComponentProps) => {
  const [allPosts, setAllPosts] = useState<postInt[] | null>(null);
  const [loading, setLoading] = useState(false);

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
  }, []);

  useEffect(() => {
    console.log("Use Effect Home!!", allPosts);
  }, [allPosts]);
  return (
    <div className="home-container">
      <div className="big-row-container">
        <div className="posts-container">
          <SendPost />
          {loading ? (
            <Spinner animation="border" className="post-loading-spinner" />
          ) : (
            ""
          )}
          {allPosts && allPosts.map((p) => <SinglePost post={p} />)}
        </div>
        <div className="online-users-container"></div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
