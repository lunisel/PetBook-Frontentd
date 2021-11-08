import SendPosts from "../posts/SendPosts";
import SinglePost from "../posts/SinglePost";
import { getMePosts } from "../posts/postLogic";
import {getPostsFromSingleUser} from "./profileLogic"
import { useEffect, useState } from "react";
import { postInt, reduxStateInt, userInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";

interface mePostPropsInt {
  user: userInt | null;
  routerProps: RouteComponentProps;
}

const MePosts = (props: mePostPropsInt) => {
  const [allPosts, setAllPosts] = useState<postInt[] | null>(null);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const postsObject = useSelector((state: reduxStateInt) => state.posts);

  let selectedPost = postsObject.selectedPost;

  useEffect(() => {
    const setPosts = async () => {
      setLoading(true);
      if (props.user === currentUser) {
        let posts = await sendRequestWithToken(
          getMePosts,
          props.routerProps,
          "",
          ""
        );
        if (posts) {
          setAllPosts(posts);
          setLoading(false);
        }
      } else {
        let posts = await getPostsFromSingleUser(props.user?._id)
        if(posts){
          setAllPosts(posts);
          setLoading(false);
        }
      }
    };
    setPosts();
  }, [selectedPost]);

  useEffect(() => {
    console.log("Use Effect Home!!", allPosts);
  }, [allPosts]);
  return (
    <div className="me-posts-container">
      {props.user === currentUser ? <SendPosts /> : ""}
      {loading ? (
        <Spinner animation="border" className="post-loading-spinner" />
      ) : (
        ""
      )}
      {allPosts && allPosts.map((p) => <SinglePost post={p} />)}
    </div>
  );
};

export default MePosts;
