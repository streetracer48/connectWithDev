import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaField";
import { addEducation } from "../../actions/profileAction";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    to: "",
    from: "",
    current: false,
    disabled: false,
    description: "",
    location: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = () => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled,
      to: ""
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const AddEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      location: this.state.location
    };
    this.props.addEducation(AddEducation, this.props.history);
  };

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      disabled,
      description,
      location
    } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add your school or degree that you have had in the past or
                current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="school"
                  placeholder="*School"
                  value={school}
                  onChange={this.onChange}
                  required
                />
                <TextFieldGroup
                  name="degree"
                  placeholder="*Degree"
                  value={degree}
                  onChange={this.onChange}
                  required
                />
                <TextFieldGroup
                  name="fieldofstudy"
                  placeholder="Field Of Study"
                  value={fieldofstudy}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={this.onChange}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.onChange}
                  // error={errors.from}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Study
                  </label>
                </div>
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.onChange}
                  // error={errors.to}
                  disabled={disabled ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  info="Tell us about your position"
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
