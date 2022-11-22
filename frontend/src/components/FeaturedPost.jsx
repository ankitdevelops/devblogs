import React from "react";
import { Link } from "react-router-dom";
const FeaturedPost = () => {
  let index;
  return (
    <>
      <ul className="list-group list-group-flush ">
        <li className="list-group-item ">
          <h5>Featured Post</h5>
        </li>
        <Link className="list-group-item list-group-item-action">An item</Link>
        <Link className="list-group-item list-group-item-action">
          A second item
        </Link>
        <Link className="list-group-item list-group-item-action">
          A third item
        </Link>
        <Link className="list-group-item list-group-item-action">
          A fourth item
        </Link>
        <Link className="list-group-item list-group-item-action">
          And a fifth one
        </Link>
        <Link className="list-group-item list-group-item-action">
          A third item
        </Link>
        <Link className="list-group-item list-group-item-action">
          A fourth item
        </Link>
        <Link className="list-group-item list-group-item-action">
          And a fifth one
        </Link>
      </ul>
    </>
  );
};

export default FeaturedPost;
