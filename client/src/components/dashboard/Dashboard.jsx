import React, { Component } from "react";

import { connect } from "react-redux";

import { currentUserProfile } from "../../actions/profileAction";

import Spinner from "../../utils/spinner";

import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    // console.log(this.props.auth);

    this.props.currentUserProfile();
  }
  render() {
    const { profile, loading } = this.props.profile;

    const { user } = this.props.auth;
    let dashboardContent;

    if (profile == null && loading) {
      dashboardContent = <Spinner />;
    } else {
      if (profile !== null && Object.keys(profile).length > 0) {
        dashboardContent = <div>have some profile data</div>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>you haven't created your profile please create your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { currentUserProfile }
)(Dashboard);
