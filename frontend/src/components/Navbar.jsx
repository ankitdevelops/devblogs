import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PostContext from "../context/PostContext";

const Navbar = () => {
  const { isLoggedin, userInfo } = useContext(AuthContext);
  const { searchPost } = useContext(PostContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function myFunction() {
    setShowDropdown(!showDropdown);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    searchPost(keyword);
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  return (
    <nav className="navbar-c ">
      <div className="container">
        <div className="nav-container">
          <div className="left-container">
            <div className="navbar-brand">
              <Link to="/">Dev</Link>
            </div>
            <div className="search">
              <form className="form-container" onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
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
                {isLoggedin && (
                  <img
                    src={
                      userInfo.avatar !== null && userInfo.avatar !== null
                        ? userInfo.avatar
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt=""
                    className="profile-btn"
                    onClick={myFunction}
                  />
                )}
                <div
                  className={
                    showDropdown ? "show dropdown-content " : "dropdown-content"
                  }
                  id="myDropdown"
                >
                  {userInfo.username && (
                    <>
                      <Link to={`/profile/${userInfo.username}`}>Profile</Link>

                      <Link to="/dashboard">Dashboard</Link>
                      <Link to="create">Create Post</Link>
                    </>
                  )}

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
