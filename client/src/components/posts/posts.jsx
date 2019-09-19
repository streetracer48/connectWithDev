import React, { Component } from "react";
import { connect } from "react-redux";
import { getposts } from "../../actions/postsAction";
import Spinner from "../common/spinner";
import PostFeed from "./postFeed";
import PostForm from "./postForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getposts();
  }
  render() {
    const { posts, loading } = this.props.post;

    let postsContent;

    if (posts === null && loading) {
      postsContent = <Spinner />;
    } else {
      if (posts && posts.length > 0) {
        postsContent = <PostFeed posts={posts} />;
      } else {
        postsContent = <p>posts not found</p>;
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />

              {postsContent}
            </div>
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
  { getposts }
)(Posts);
