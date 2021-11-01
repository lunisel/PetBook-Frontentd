import SendPosts from "../posts/SendPosts"
import SinglePost from "../posts/SinglePost"
import {getMePosts} from "../posts/postLogic"
import { useEffect, useState } from "react";
import { postInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";

const MePosts = () => {
const [allPosts, setAllPosts] = useState<postInt[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setPosts = async () => {
      setLoading(true);
      let posts = await getMePosts();
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
    return(
        <div className="me-posts-container">
            <SendPosts/>
            {loading ? (
            <Spinner animation="border" className="post-loading-spinner" />
          ) : (
            ""
          )}
          {allPosts && allPosts.map((p) => <SinglePost post={p} />)}
        </div>
    )
}

export default MePosts