import React from "react";
import { Link } from "react-router-dom";
const UserProfile = () => {
  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto col-sm-10 col-md-10  ">
          <div className="card card-body">
            <div className="user-image mx-auto my-3">
              <img
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--3nWI2tFP--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/408120/d560ecca-fe93-4d9c-8eb4-b8fb72457a38.jpg"
                alt="user_image"
                height={150}
                width={150}
                style={{ borderRadius: "100px" }}
              />
            </div>
            <div className="user-name text-center">
              <h3>Ankit Kumar</h3>
            </div>
            <div className="user-info text-center my-2">
              <p className="fs-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi ipsa repudiandae nam facilis distinctio obcaecati ipsam
                neque quae reiciendis eum!
              </p>
            </div>
            <div className="user-social  w-50 mx-auto">
              <ul className="d-flex justify-content-evenly">
                <li className="list-group-item">India</li>
                <li className="list-group-item">hiankit@protonmail.com</li>
                <li className="list-group-item">
                  <Link>Github</Link>
                </li>
                <li className="list-group-item">
                  <Link>Twitter</Link>
                </li>
                <li className="list-group-item">
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
};

export default UserProfile;
