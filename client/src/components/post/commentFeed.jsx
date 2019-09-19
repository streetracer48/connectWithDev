import React from "react";
import CommentItem from "./commentItem";

const CommentFeed = ({ comments, postId }) => {
  return comments.map(comment => (
    <CommentItem comment={comment} postId={postId} />
  ));
};

export default CommentFeed;
