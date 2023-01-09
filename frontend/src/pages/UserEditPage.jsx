import React, { useState, useContext, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const UserEditPage = () => {
  const { userProfile, getUserProfile } = useContext(AuthContext);
  const { username } = useParams();

  //   states
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState([]);
  const [learning, setLearning] = useState("");
  const [avalable, setAvailable] = useState("");

  useEffect(() => {
    getUserProfile(username);
    if (userProfile) {
      setName(userProfile.name);
      setPhone(userProfile.phone);
      setDesignation(userProfile.designation);
      //   setSkills(userProfile.skills);
      setLearning(userProfile.learning);
      setAbout(userProfile.about);
      setAvailable(userProfile.available_for);
    }
  }, [username]);

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
                  //   defaultValue={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Email
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">About</label>
                <textarea className="form-control" rows={3} defaultValue={""} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Designation</label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-12 text-dark">
                <label className="form-label text-white">Skills</label>
                <TagsInput
                  value={skills}
                  onChange={setSkills}
                  name="skill"
                  placeHolder="Enter skill"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Learning</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Available For</label>
                <input type="password" className="form-control" />
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
