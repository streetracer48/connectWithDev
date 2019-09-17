import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileAction";
class Experience extends Component {
  onDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const { experience } = this.props;
    let experienceContent;

    if (experience && experience.length > 0) {
      experienceContent = this.props.experience.map(exp => (
        <tr>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              type="submit"
              onClick={() => this.onDelete(exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      experienceContent = <p>You have not yet add your experiences</p>;
    }
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Year</th>
              <th />
            </tr>
            {experienceContent}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience);
