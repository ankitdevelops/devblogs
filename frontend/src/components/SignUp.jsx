import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const SignUp = () => {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    if (name && username && email && password) {
      if (password === confirmPassword) {
        await signUp(data);
      }
    } else {
      setError("Please Check Your Details");
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
              <h6 className="text-center text-info my-2">
                Create Your Account
              </h6>
            </div>
            {error && (
              <h6 className="text-center text-warning my-2">{error}</h6>
            )}
            <form className="form-floating text-dark" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
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
              <div className="form-floating mb-3">
                <input
                  type="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="floatingInput">Confirm Password</label>
              </div>
              <div className="d-grid gap-2 ">
                <button className="btn btn-primary" type="submit">
                  Register Now
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Already Have an account <Link to="/signin">Login Now</Link>
            </p>
          </div>
        </div>
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2 text-white"></div>
      </div>
    </>
  );
};

export default SignUp;
