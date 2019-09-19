import React from "react";
import PostItem from "./postItem";

const PostFeed = ({ posts }) => {
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

export default PostFeed;
