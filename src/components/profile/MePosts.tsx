import SendPosts from "../posts/SendPosts";
import SinglePost from "../posts/SinglePost";
import { getMePosts } from "../posts/postLogic";
import { useEffect, useState } from "react";
import { postInt, reduxStateInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector } from "react-redux";

const MePosts = (props: RouteComponentProps) => {
  const [allPosts, setAllPosts] = useState<postInt[] | null>(null);
  const [loading, setLoading] = useState(false);

  const postsObject = useSelector((state: reduxStateInt) => state.posts);

  let selectedPost = postsObject.selectedPost;

  useEffect(() => {
    const setPosts = async () => {
      setLoading(true);
      let posts = await sendRequestWithToken(getMePosts, props, "", "");
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
    <div className="me-posts-container">
      <SendPosts />
      {loading ? (
        <Spinner animation="border" className="post-loading-spinner" />
      ) : (
        ""
      )}
      {allPosts && allPosts.map((p) => <SinglePost post={p} />)}
    </div>
  );
};

export default withRouter(MePosts);
