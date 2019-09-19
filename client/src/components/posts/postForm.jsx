import React, { Component } from "react";
import TextAreaField from "../common/TextAreaField";
import { connect } from "react-redux";
import { addPost } from "../../actions/postsAction";

class PostForm extends Component {
  state = {
    text: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const newpost = {
      text: this.state.text
    };
    this.props.addPost(newpost).then(
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
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something</div>
          <form onSubmit={this.onSubmit}>
            <div className="card-body">
              <div className="form-group">
                <TextAreaField
                  name="text"
                  value={text}
                  placeholder="Text"
                  onChange={this.onChange}
                />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addPost }
)(PostForm);
