import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/PostContext";
const FeaturedPost = () => {
  const { featuredPosts } = useContext(PostContext);

  return (
    <>
      <div className="card card-body p-1">
        <ul className="list-group list-group-flush ">
          <li className="list-group-item ">
            <h5>Featured Post</h5>
          </li>
          {featuredPosts &&
            featuredPosts.map((post, index) => (
              <Link
                to={`/${post.author.username}/${post.slug}`}
                key={index}
                className="list-group-item list-group-item"
              >
                {post.title}
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
};

export default FeaturedPost;
