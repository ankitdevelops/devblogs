import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    await login(data);

    if (isLoggedin) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="row container mx-auto">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2 text-white"></div>
        <div className="col-md-6 ">
          <div className="card card-body mt-5">
            <div className="sign-in-heading my-3">
              <h2 className="text-center ">Welcome To DEV Blogs</h2>
            </div>
            <form className="form-floating text-dark" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="name@example.com"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingInput">Password</label>
              </div>
              <div className="d-grid gap-2 ">
                <button className="btn btn-primary" type="submit">
                  Login Now
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Don't Have an account <Link to="/signup">create one</Link>
            </p>
          </div>
        </div>
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2 text-white"></div>
      </div>
    </>
  );
};

export default Signin;
