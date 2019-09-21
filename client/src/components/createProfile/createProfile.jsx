import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import TextAreaFieldGroup from "../common/TextAreaField";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, currentUserProfile } from "../../actions/profileAction";

class CreateProfile extends Component {
  state = {
    displaySocialInouts: false,
    handle: "",
    company: "",
    website: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    location: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      company,
      website,
      status,
      skills,
      location,
      bio,
      githubusername,
      handle,
      facebook,
      twitter,
      instagram,
      youtube
    } = this.state;
    const createProfileData = {
      company,
      website,
      status,
      skills,
      location,
      bio,
      githubusername,
      handle,
      facebook,
      twitter,
      instagram,
      youtube
    };
    this.props.createProfile(createProfileData, this.props.history);
  };

  componentDidMount() {
    this.props.currentUserProfile();
    // console.log(this.props.profile.profile);
    // const { profile, loading } = this.props.profile;
    // console.log(this.props.profile.profile);
    // if (profile == null) {
    //   return <Redirect to="/dashboard" />;
    // }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.profile.profile);
    if (
      this.props.profile.profile &&
      Object.keys(this.props.profile.profile).length > 0
    ) {
      return this.props.history.push("/dashboard");
    }
  }
  render() {
    const {
      errors,
      displaySocialInouts,
      status,
      company,
      handle,
      website,
      location,
      bio,
      skills,
      twitter,
      facebook,
      instagram,
      youtube,
      githubusername
    } = this.state;

    const { profile } = this.props.profile;

    let socialInputs;
    if (displaySocialInouts) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={twitter}
            icon="fab fa-twitter"
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            name="facebook"
            placeholder="Facebook Profile URL"
            value={facebook}
            icon="fab fa-facebook"
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            name="youtube"
            placeholder="Youtube Profile URL"
            value={youtube}
            icon="fab fa-youtube"
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            name="instagram"
            placeholder="Instagram Profile URL"
            value={instagram}
            onChange={this.onChange}
            error={errors.instagram}
            icon="fab fa-instagram"
          />
        </div>
      );
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "intern", value: "intern" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">*= required filed</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL example company name website profile name"
                />
                <SelectListGroup
                  name="status"
                  value={status}
                  placeholder="Status"
                  options={options}
                  onChange={this.onChange}
                  info="Select  Status"
                  error={errors.status}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company Name"
                  value={company}
                  info="Could be your own company or you work for one"
                  error={errors.company}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={website}
                  info="Could be your own website or company"
                  error={errors.website}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={this.onChange}
                  info="City (eg. Dhaka)"
                  error={errors.location}
                />
                <TextFieldGroup
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  placeholder="Skills"
                  info="please use comma separated values(eg, HTML, Python, Javascript)"
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="Github Username"
                  value={githubusername}
                  error={errors.githubusername}
                  onChange={this.onChange}
                  info="If you want to get your latest repos , include your github usernames"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="Short Bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info=" Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInouts: !prevState.displaySocialInouts
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Networks Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, currentUserProfile }
)(withRouter(CreateProfile));
