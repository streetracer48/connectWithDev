import React, { Component } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    this.props.loginUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.onChange}
                  type="email"
                />

                <TextFieldGroup
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
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
  { loginUser }
)(Login);
