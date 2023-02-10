import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DotLoader from "react-spinners/DotLoader";
import PostContext from "../context/PostContext";

const Dashboard = () => {
  const { userProfile, getUserProfile } = useContext(AuthContext);
  const { deletePost } = useContext(PostContext);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  let username;
  if (user) {
    username = user.username;
  }

  useEffect(() => {
    getUserProfile(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // edit redirect
  const handleEdit = (slug) => {
    navigate(`/${username}/${slug}/edit`);
  };

  // delete post
  const handleDelete = (slug) => {
    window.confirm("Confirm Deletion !");
    deletePost(slug);
    navigate("/dashboard");
    window.location.reload();
  };

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
                <p className="fs-5  mx-auto w-100 w-sm-75">
                  {userProfile.about}
                </p>
              </div>
              <div className="user-social  w-100 w-sm-50 mx-auto">
                <ul className="d-flex justify-content-center  flex-wrap">
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
                    <div className="my-2">
                      <h5>My Posts</h5>
                      <hr />
                    </div>

                    {userProfile.authorBlogs &&
                      userProfile.authorBlogs.map(
                        (post, index) =>
                          post.status === "published" && (
                            <div className="card card-body my-2 " key={index}>
                              <div className="post-wrapper d-flex justify-content-center align-items-center flex-wrap justify-content-md-between">
                                <div className="post">
                                  <Link to={`/${username}/${post.slug}`}>
                                    <h5>{post.title}</h5>
                                  </Link>
                                  <small>Published On: {post.created}</small>
                                </div>

                                <ul className="list-group list-group-flush d-flex flex-row  ">
                                  <li
                                    className="list-group-item"
                                    role="button"
                                    onClick={() => {
                                      handleEdit(post.slug);
                                    }}
                                  >
                                    Edit
                                  </li>
                                  <li
                                    className="list-group-item"
                                    role="button"
                                    onClick={() => {
                                      handleDelete(post.slug);
                                    }}
                                  >
                                    Delete
                                  </li>
                                  <li className="list-group-item" role="button">
                                    Archive
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )
                      )}
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

export default Dashboard;
