import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
// import AuthContext from "../context/AuthContext";
import PostContext from "../context/PostContext";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();
  const { singleUser, getUserProfile } = useContext(PostContext);
  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (!singleUser) {
    return (
      <>
        <div className="loader d-flex justify-content-center mt-5">
          <DotLoader color="#fff" size={150} />
        </div>
      </>
    );
  } else {
    return (
      <main className="mt-3">
        <div className="row container  ">
          <div className="mx-auto col-sm-10 col-md-10  ">
            <div className="card card-body">
              <div className="user-image mx-auto my-3">
                <img
                  src={`http://127.0.0.1:8000/${singleUser.user.avatar}`}
                  alt="user_image"
                  height={150}
                  width={150}
                  style={{ borderRadius: "100px" }}
                />
              </div>
              <div className="user-name text-center text-capitalize">
                <h3>{singleUser.user.name}</h3>
              </div>
              <div className="user-info text-center my-2">
                <p className="fs-5">{singleUser.user.about}</p>
              </div>
              <div className="user-social  w-50 mx-auto">
                <ul className="d-flex justify-content-evenly">
                  <li className="list-group-item mx-1">India</li>
                  <li className="list-group-item mx-1">
                    {singleUser.user.email}
                  </li>
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
                          Python
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
                          {singleUser.user.designation}
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
                        <li className="list-group-item ">Python</li>
                        <li className="list-group-item ">Django</li>
                        <li className="list-group-item ">JavaScript</li>
                        <li className="list-group-item ">React</li>
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
                          Freelance Project
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
                        {singleUser.user.blogs.map((post, index) => (
                          <Link
                            to={`/${username}/${post.slug}`}
                            className="list-group-item list-group-item text-capitalize"
                            key={index}
                          >
                            {post.title}
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <div className="card card-body">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item ">
                          <h5>Recent Comments</h5>
                        </li>
                        <Link className="list-group-item list-group-item">
                          An item
                        </Link>
                        <Link className="list-group-item list-group-item">
                          A second item
                        </Link>
                        <Link className="list-group-item list-group-item">
                          A third item
                        </Link>
                        <Link className="list-group-item list-group-item">
                          A fourth item
                        </Link>
                        <Link className="list-group-item list-group-item">
                          And a fifth one
                        </Link>
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
