import React, { Component } from "react";
import { connect } from "react-redux";

class CommentItem extends Component {
  render() {
    const { comment, postId } = this.props;
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
            <button type="button" className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);
