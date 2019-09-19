import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../../actions/postsAction";
import Spinner from "../common/spinner";
import PostItem from "../posts/postItem";
import CommentForm from "./commentForm";
import CommentFeed from "./commentFeed";
class Post extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostById }
)(Post);
