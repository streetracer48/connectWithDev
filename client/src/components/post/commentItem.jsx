import React, { Component } from "react";
import { connect } from "react-redux";
import { commentDelete } from "../../actions/postsAction";

class CommentItem extends Component {
  onDeleteComment = (postId, id) => {
    this.props.commentDelete(postId, id);
  };
  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              src={comment && comment.avatar}
              className="rounded-circle d-none d-md-block"
              alt="user photos"
            />
            <br />
            <p className="text-center">{comment && comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment && comment.text}</p>
            {!auth.loading && comment.user === auth.user.id ? (
              <button
                type="submit"
                className="btn btn-danger mr-1"
                onClick={() => this.onDeleteComment(postId, comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { commentDelete }
)(CommentItem);
