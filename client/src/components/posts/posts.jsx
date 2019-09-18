import React, { Component } from "react";
import { connect } from "react-redux";
import { getposts } from "../../actions/postsAction";

class Posts extends Component {
  componentDidMount() {
    this.props.getposts();
  }
  render() {
    return <div className="posts">POST</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getposts }
)(Posts);
