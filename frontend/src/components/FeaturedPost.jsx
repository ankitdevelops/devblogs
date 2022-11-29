import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/PostContext";
const FeaturedPost = () => {
  const { featuredPosts, getFeaturedBlogs } = useContext(PostContext);

  // useEffect(() => {
  //   getFeaturedBlogs();
  // }, []);
  return (
    <>
      <div className="card card-body p-1">
        <ul className="list-group list-group-flush ">
          <li className="list-group-item ">
            <h5>Featured Post</h5>
          </li>
          {featuredPosts &&
            featuredPosts.map((post, index) => (
              <Link key={index} className="list-group-item list-group-item">
                {post.title}
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
};

export default FeaturedPost;
