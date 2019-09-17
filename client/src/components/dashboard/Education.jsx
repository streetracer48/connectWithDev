import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileAction";
class Education extends Component {
  onDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const { education } = this.props;

    let educationContent;

    if (education && education.length > 0) {
      educationContent = education.map(edu => (
        <tr>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
            {edu.to === null || edu.to == 0 ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.onDelete(edu._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      educationContent = <p>You have not yet add your education</p>;
    }

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Year</th>
            </tr>
            {educationContent}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(Education);
