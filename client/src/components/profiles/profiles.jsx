import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileAction";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    return <div></div>;
  }
}

export default connect(
  null,
  { getProfiles }
)(Profiles);
