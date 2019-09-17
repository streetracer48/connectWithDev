import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfilebyhandler } from "../../actions/profileAction";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import About from "./about";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfilebyhandler(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      return (profileContent = <Spinner />);
    } else {
      profileContent = (
        <div className="row">
          <div className="col-md-6">
            <Link className="btn btn-light" to="/dashboard">
              Back To Home
            </Link>
          </div>
          <div className="col-md-6"></div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">{profileContent}</div>
          <About profile={profile} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfilebyhandler }
)(Profile);
