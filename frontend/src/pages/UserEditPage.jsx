import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const UserEditPage = () => {
  const { userProfile, getUserProfile } = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    getUserProfile(username);
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
    }
  }, [userProfile]);

  //   states
  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [uname, setUname] = useState(userProfile ? userProfile.username : "");
  const [email, setEmail] = useState(userProfile ? userProfile.email : "");
  const [about, setAbout] = useState(userProfile ? userProfile.about : "");
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

  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto col-sm-8 col-md-8  ">
          <div className="card card-body">
            <div className="row g-3">
              <div className="col-12">
                <div className="d-flex  align-items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/30.jpg"
                    title=""
                    alt=""
                    style={{
                      height: "100px",
                      width: "auto",
                      borderRadius: "50px",
                    }}
                  />
                  <input
                    className="form-control mx-5"
                    type="file"
                    id="formFile"
                    style={{ width: "30%" }}
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
                  value={learning || ""}
                  onChange={(e) => setLearning(e.target.value)}
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
                <button type="submit" className="btn btn-primary">
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
