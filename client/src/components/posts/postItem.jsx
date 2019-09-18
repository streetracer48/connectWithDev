import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postLike, unLikePost } from "../../actions/postsAction";
import classnames from "classnames";
class PostItem extends Component {
  onLikeClick = id => {
    console.log(id);
    this.props.postLike(id);
  };

  onUnlikeClick = id => {
    this.props.unLikePost(id);
  };

  postDelete = () => {};

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes && likes.length > 0) {

      if (
        likes &&
        likes.filter(like => like.user === auth.user.id).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    const { post, data, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="user profile"
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>

          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="bdge bdge-light">
                    {post.likes.length > 0 && <span>{post.likes.length}</span>}
                  </span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.onUnlikeClick(post._id)}
                  disabled={!this.findUserLike(post.likes)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to="post/id" className="btn btn-info mr-1">
                  Comments
                </Link>
                <button
                  onClick={this.postDelete}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

const mapStateProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateProps,
  { postLike, unLikePost }
)(PostItem);
