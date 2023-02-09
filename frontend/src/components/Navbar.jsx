import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PostContext from "../context/PostContext";
import Categories from "./Categories";

const Navbar = () => {
  const { isLoggedin, userInfo } = useContext(AuthContext);
  const { searchPost } = useContext(PostContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileNav, setshowMobileNav] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function myFunction() {
    setShowDropdown(!showDropdown);
  }

  function mobileNav() {
    setshowMobileNav(!showMobileNav);
  }

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };

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
            <div className="search d-none">
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
            <button
              type="submit"
              className="search-btn d-sm-none"
              onClick={mobileNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <div className="profile d-none d-md-block">
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
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
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
                      <Link to="/create">Create </Link>
                      <Link to="/saved">Reading List</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </>
                  )}

                  <hr />
                  {isLoggedin ? (
                    <Link to="/" onClick={signOut}>
                      Sign Out
                    </Link>
                  ) : (
                    <Link to="/signin">Sign in</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile nav */}
      <div className={showMobileNav ? `nav__mobile  ` : "d-none d-sm-none"}>
        <button
          type="submit"
          className="search-btn d-sm-none position-absolute top-0 right-0 float-end"
          onClick={mobileNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
        {/* search */}
        <div className="search w-100 text-center">
          <form className="form-container" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-100"
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
        <hr />
        <ul className="my-2 fs-2 list-unstyled text-center">
          {userInfo.username && (
            <>
              <h3 className="text-decoration-underline">Links</h3>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to={`/profile/${userInfo.username}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link className="btn  border-0 btn-outline-light" to="/create">
                  Create{" "}
                </Link>
              </li>
              <li>
                <Link className="btn  border-0 btn-outline-light" to="/saved">
                  Reading List
                </Link>
              </li>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
        <hr />
        <h3 className="text-decoration-underline">Categories</h3>
        <Categories />
      </div>
    </nav>
  );
};

export default Navbar;
