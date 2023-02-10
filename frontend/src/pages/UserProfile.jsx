import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();
  const { userProfile, getUserProfile, userInfo } = useContext(AuthContext);

  useEffect(() => {
    getUserProfile(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (!userProfile) {
    return (
      <>
        <div className="loader d-flex justify-content-center mt-5">
          <DotLoader color="#fff" size={50} />
        </div>
      </>
    );
  } else {
    return (
      <main className="mt-3">
        <div className="row container  ">
          <div className="mx-auto col-sm-10 col-md-10  ">
            <div className="card card-body">
              <div>
                {userInfo.username === username && (
                  <Link
                    to={`/${username}/edit/`}
                    className="float-end btn btn-warning"
                    style={{ width: "150px" }}
                  >
                    Edit Profile
                  </Link>
                )}
              </div>
              <div className="user-image mx-auto my-3">
                <img
                  src={userProfile.avatar && userProfile.avatar}
                  alt="user_image"
                  height={150}
                  width={150}
                  style={{ borderRadius: "100px" }}
                />
              </div>
              <div className="user-name text-center text-capitalize">
                <h3>{userProfile.name}</h3>
              </div>
              <div className="user-info text-center my-2">
                <p className="fs-5  mx-auto w-100 w-sm-50">
                  {userProfile.about}
                </p>
              </div>
              <div className="user-social  w-50 mx-auto">
                <ul className="d-flex  flex-wrap justify-content-center text-center">
                  <li className="list-group-item mx-1">
                    {/* Date Joined: {userProfile.date_joined} */}
                  </li>
                  <li className="list-group-item mx-1">India</li>
                  <li className="list-group-item mx-1">{userProfile.email}</li>
                  <li className="list-group-item mx-1">
                    <Link>Github</Link>
                  </li>
                  <li className="list-group-item mx-1">
                    <Link>Twitter</Link>
                  </li>
                  <li className="list-group-item mx-1">
                    <Link>Website</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-auto col-sm-10 col-md-10 mt-2 ">
            <div className="row">
              <div className="col-md-3">
                <div className="row">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h6>Learning</h6>
                          <hr />
                          {userProfile.learning}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h6>Current Job</h6>
                          <hr />
                          {userProfile.designation}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h6>Skills</h6>
                          <hr />
                        </li>

                        <li className="list-group-item ">
                          {userProfile.skills}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h6>Available For</h6>
                          <hr />
                          {userProfile.available_for}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h5>Recent Post</h5>
                        </li>
                        {userProfile.authorBlogs &&
                          userProfile.authorBlogs.map(
                            (post, index) =>
                              post.status === "published" && (
                                <Link
                                  to={`/${username}/${post.slug}`}
                                  className="list-group-item list-group-item text-capitalize"
                                  key={index}
                                >
                                  {post.title}
                                </Link>
                              )
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default UserProfile;
