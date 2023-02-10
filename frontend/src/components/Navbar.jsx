import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PostContext from "../context/PostContext";
import { toast } from "react-toastify";

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
    if (keyword !== "") {
      searchPost(keyword);
      navigate(`/search?q=${keyword}`);
      setKeyword("");
    } else {
      toast.error("Empty Search Field");
    }
  };

  return (
    <nav className="navbar-c ">
      <div className="container">
        <div className="nav-container">
          <div className="left-container">
            <div className="navbar-brand">
              <Link to="/">Dev</Link>
            </div>
            <div className="search d-none d-sm-block">
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
                  {userInfo.username && isLoggedin && (
                    <>
                      <Link
                        to={`/profile/${userInfo.username}`}
                        onClick={() => {
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/create"
                        onClick={() => {
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        Create{" "}
                      </Link>
                      <Link
                        to="/saved"
                        onClick={() => {
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        Reading List
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => {
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        Dashboard
                      </Link>
                    </>
                  )}

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
      <div
        className={
          showMobileNav ? `nav__mobile d-sm-none ` : "d-none d-sm-none"
        }
      >
        <button
          type="submit"
          className="search-btn d-sm-none position-absolute top-0  end-0 mt-2 "
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
            <button
              type="submit"
              className="search-btn"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
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

        <ul className=" fs-2 list-unstyled p-2 ">
          {userInfo.username && (
            <>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to={`/profile/${userInfo.username}`}
                  onClick={() => setshowMobileNav(!showMobileNav)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to="/create"
                  onClick={() => setshowMobileNav(!showMobileNav)}
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to="/saved"
                  onClick={() => setshowMobileNav(!showMobileNav)}
                >
                  Reading List
                </Link>
              </li>
              <li>
                <Link
                  className="btn  border-0 btn-outline-light"
                  to="/dashboard"
                  onClick={() => setshowMobileNav(!showMobileNav)}
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {isLoggedin && <hr />}
          <li>
            <Link
              to={`/category/${"html"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              HTML
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"css"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              CSS
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"javascript"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              JavaScript
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"python"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              Python
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"django"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              Django
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"tutorials"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              to={`/category/${"others"}`}
              className="btn  border-0 btn-outline-light"
              onClick={() => setshowMobileNav(!showMobileNav)}
            >
              Others
            </Link>
          </li>
        </ul>

        <ul className="list-unstyled p-2 fs-2"></ul>
      </div>
    </nav>
  );
};

export default Navbar;
