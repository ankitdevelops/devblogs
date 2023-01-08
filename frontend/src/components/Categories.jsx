import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="d-grid gap-2 ">
        <Link to={`/saved`} className="btn  border-0 btn-outline-light">
          Reading List
        </Link>
        <Link
          to={`/category/${"html"}`}
          className="btn  border-0 btn-outline-light"
        >
          HTML
        </Link>
        <Link
          to={`/category/${"css"}`}
          className="btn  border-0 btn-outline-light"
        >
          CSS
        </Link>
        <Link
          to={`/category/${"javascript"}`}
          className="btn  border-0 btn-outline-light"
        >
          JavaScript
        </Link>
        <Link
          to={`/category/${"python"}`}
          className="btn  border-0 btn-outline-light"
        >
          Python
        </Link>
        <Link
          to={`/category/${"django"}`}
          className="btn  border-0 btn-outline-light"
        >
          Django
        </Link>
        <Link
          to={`/category/${"tutorials"}`}
          className="btn  border-0 btn-outline-light"
        >
          Tutorials
        </Link>
        <Link
          to={`/category/${"others"}`}
          className="btn  border-0 btn-outline-light"
        >
          Others
        </Link>
      </div>
    </>
  );
};

export default Categories;
