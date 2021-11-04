import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { addSelectedPost } from "../../redux/actions/post";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { commentsInt, reduxStateInt } from "../../utils/interfaces";
import { deleteComment, getTime } from "./postLogic";

const SinglePostComments = (props: RouteComponentProps) => {
  const post = useSelector((state: reduxStateInt) => state.posts.selectedPost);
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const dispatch = useDispatch();

  const comments: commentsInt[] | undefined = post?.comments;

  return (
    <div className="post-comments-container">
      {comments
        ? comments!
            .sort(function (a: any, b: any) {
              return +new Date(b.createdAt) - +new Date(a.createdAt);
            })
            .map((c) => (
              <div className="modal-single-comment-cont">
                <img
                  src={c.user.avatar}
                  alt=""
                  className="comment-user-avatar rounded-circle"
                />
                <div className="comment-text-container">
                  <div className="comment-top-container">
                    <span className="comment-username">{c.user.username}</span>
                    <span className="comment-time">{getTime(c.createdAt)}</span>
                  </div>

                  <span className="modal-comment-text">{c.text}</span>
                </div>
                <div className="comment-icon-container">
                  {user?._id === c.user._id ? (
                    <BsTrash
                      className="comment-dropdown-icon"
                      onClick={async () => {
                        let data = await sendRequestWithToken(
                          deleteComment,
                          props,
                          post!._id,
                          c._id
                        );
                        if (data) dispatch(addSelectedPost(data));
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
        : ""}
    </div>
  );
};

export default withRouter(SinglePostComments);
