import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/PostContext";

const Categories = () => {
  const { getCategoryPosts } = useContext(PostContext);

  const category = (category) => {
    getCategoryPosts(category);
  };
  return (
    <>
      <div className="d-grid gap-2 ">
        <Link className="btn  border-0 btn-outline-light">Reading List</Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("html");
          }}
        >
          HTML
        </Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("css");
          }}
        >
          CSS
        </Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("javascript");
          }}
        >
          JavaScript
        </Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("python");
          }}
        >
          Python
        </Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("django");
          }}
        >
          Django
        </Link>
        <Link
          className="btn  border-0 btn-outline-light"
          onClick={(e) => {
            category("tutorials");
          }}
        >
          Tutorials
        </Link>
      </div>
    </>
  );
};

export default Categories;
