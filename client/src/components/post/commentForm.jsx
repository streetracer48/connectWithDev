import React, { Component } from "react";
import TextFieldArea from "../common/TextAreaField";
import { connect } from "react-redux";
import { addComment } from "../../actions/postsAction";

class CommentForm extends Component {
  state = {
    text: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { postId } = this.props;
    const newComment = {
      text: this.state.text
    };

    this.props.addComment(postId, newComment).then(
      this.setState({
        text: ""
      })
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { text } = this.state;
    const { postId } = this.props;
    console.log(postId);
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a Comment</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldArea
                  name="text"
                  placeholder="Reply to post"
                  value={text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addComment }
)(CommentForm);
