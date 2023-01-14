import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserEditPage = () => {
  const { userProfile, getUserProfile, updateUser } = useContext(AuthContext);
  const { username } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUserProfile(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setUname(userProfile.username);
      setEmail(userProfile.email);
      setPhone(userProfile.phone_number);
      setDesignation(userProfile.designation);
      setLearning(userProfile.learning);
      setAbout(userProfile.about);
      setAvailable(userProfile.available_for);
      setSkills(userProfile.skills);
      // setAvatar(userProfile.avatar);
    }
  }, [userProfile]);

  //   states
  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [uname, setUname] = useState(userProfile ? userProfile.username : "");
  const [email, setEmail] = useState(userProfile ? userProfile.email : "");
  const [about, setAbout] = useState(userProfile ? userProfile.about : "");
  const [avatar, setAvatar] = useState([]);
  const [phone, setPhone] = useState(
    userProfile ? userProfile.phone_number : ""
  );
  const [designation, setDesignation] = useState(
    userProfile ? userProfile.designation : ""
  );

  const [learning, setLearning] = useState(
    userProfile ? userProfile.learning : ""
  );
  const [available, setAvailable] = useState(
    userProfile ? userProfile.available : ""
  );

  const [skills, setSkills] = React.useState(userProfile.skills);

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (userProfile.name !== name) {
      formData.append("name", name);
    }
    if (userProfile.about !== about) {
      formData.append("about", about);
    }
    if (userProfile.phone_number !== phone) {
      formData.append("phone_number", phone);
    }
    if (userProfile.designation !== designation) {
      formData.append("designation", designation);
    }
    if (userProfile.skills !== skills) {
      formData.append("skills", skills);
    }
    if (userProfile.learning !== learning) {
      formData.append("learning", learning);
    }
    if (userProfile.available_for !== available) {
      formData.append("available_for", available);
    }

    if (avatar.length !== 0) {
      formData.append("avatar", avatar[0]);
    }

    await updateUser(username, formData);
    navigate(`/profile/${username}`);
  };

  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto col-sm-8 col-md-8  ">
          <div className="card card-body">
            <div className="row g-3">
              <div className="col-12">
                <div className="d-flex  align-items-center">
                  <img
                    src={userProfile.avatar}
                    alt="user-profileImage"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <input
                    className="form-control mx-5"
                    type="file"
                    id="formFile"
                    style={{ width: "30%" }}
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => setAvatar([...avatar, e.target.files[0]])}
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={uname || ""}
                  onChange={(e) => setUname(e.target.value)}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="col-12">
                <label className="form-label">About</label>
                <textarea
                  className="form-control"
                  rows={3}
                  defaultValue={about || ""}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  value={designation || ""}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div className="col-12 text-dark">
                <label className="form-label text-white">Skills</label>
                <input
                  type="text"
                  className="form-control"
                  value={skills || ""}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Learning</label>
                <input
                  type="email"
                  className="form-control"
                  value={learning || ""}
                  onChange={(e) => setLearning(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Available For</label>
                <input
                  type="text"
                  className="form-control"
                  value={available || ""}
                  onChange={(e) => setAvailable(e.target.value)}
                />
              </div>
              <div className="col-12 ">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserEditPage;
