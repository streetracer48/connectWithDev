import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileAction";
import Spinner from "../common/spinner";
import ProfileItems from "./profileItems";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profiles;

    let profileContent;
    if (profiles == null && loading) {
      profileContent = <Spinner />;
    } else {
      if (profiles !== null && profiles.length > 0) {
        profileContent = profiles.map(profile => (
          <ProfileItems profile={profile} />
        ));
      } else {
        <p>not profiles found ...</p>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
