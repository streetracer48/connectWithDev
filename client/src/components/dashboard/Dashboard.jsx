import React, { Component } from "react";

import { connect } from "react-redux";

import { currentUserProfile } from "../../actions/profileAction";

class Dashboard extends Component {
  componentDidMount() {
    // console.log(this.props.auth);

    this.props.currentUserProfile();
  }
  render() {
    return (
      <div>
        <h1>Dashboar Component</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { currentUserProfile }
)(Dashboard);
