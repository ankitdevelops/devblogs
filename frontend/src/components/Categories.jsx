import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="d-grid gap-2 ">
        <Link className="btn  border-0 btn-outline-light">Home</Link>
        <Link className="btn  border-0 btn-outline-light">Reading List</Link>
        <Link className="btn  border-0 btn-outline-light">HTML</Link>
        <Link className="btn  border-0 btn-outline-light">CSS</Link>
        <Link className="btn  border-0 btn-outline-light">JavaScript</Link>
        <Link className="btn  border-0 btn-outline-light">React</Link>
        <Link className="btn  border-0 btn-outline-light">Python</Link>
        <Link className="btn  border-0 btn-outline-light">Django</Link>
        <Link className="btn  border-0 btn-outline-light">Bootstrap</Link>
        <Link className="btn  border-0 btn-outline-light">FastAPI</Link>
        <Link className="btn  border-0 btn-outline-light">Flask</Link>
        <Link className="btn  border-0 btn-outline-light">Tailwind</Link>
      </div>
    </>
  );
};

export default Categories;
