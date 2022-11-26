import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  const { isLoggedin, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  function myFunction() {
    setShowDropdown(!showDropdown);
  }
  return (
    <nav className="navbar-c ">
      <div className="container">
        <div className="nav-container">
          <div className="left-container">
            <div className="navbar-brand">
              <Link to="/">Dev</Link>
            </div>
            <div className="search">
              <form className="form-container">
                <input type="search" placeholder="Search" />
                <button type="submit" className="search-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  {/* Search */}
                </button>
              </form>
            </div>
          </div>
          <p className="text-white">{isLoggedin}</p>
          <div className="right-container">
            <div className="create-btn">
              {isLoggedin ? (
                <Link to="/create">Create Post</Link>
              ) : (
                <Link to="/signin">Sign in</Link>
              )}
            </div>
            <div className="profile">
              <div>
                <img
                  src="https://randomuser.me/api/portraits/med/men/75.jpg"
                  alt=""
                  className="profile-btn"
                  onClick={myFunction}
                />
                <div
                  className={
                    showDropdown ? "show dropdown-content " : "dropdown-content"
                  }
                  id="myDropdown"
                >
                  <Link to={`/profile/${user}`}>Profile</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="create">Create Post</Link>
                  <hr />
                  {isLoggedin ? (
                    <Link to="/logout">Sign Out</Link>
                  ) : (
                    <Link to="/signin">Sign in</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
