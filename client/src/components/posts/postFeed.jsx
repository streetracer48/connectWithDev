import React from "react";
import PostItem from "./postItem";

const PostFeed = ({ posts }) => {
  console.log("what i got", posts);
  return posts.map(post => (
    <PostItem key={post._id} post={post} data="hello" />
  ));
};

export default PostFeed;
