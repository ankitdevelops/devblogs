import React, { useContext, useEffect } from "react";
import PostContext from "../context/PostContext";
import ReactMarkdown from "react-markdown";
import DotLoader from "react-spinners/DotLoader";
import { Link } from "react-router-dom";
const PostCard = () => {
  const { posts, getPosts, post, loading } = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);

  if (!posts) {
    return (
      <>
        <div className="loader d-flex justify-content-center mt-5">
          <DotLoader color="#fff" size={150} />
        </div>
      </>
    );
  } else {
    return (
      <>
        {posts.map((post, index) => (
          <div className="card card-body mb-2" key={index}>
            <div className="author-profile ">
              <div className="author-img  ">
                <img
                  src={post.author.avatar}
                  alt=""
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="author-info ms-2">
                <Link to={`/profile/${post.author.username}`}>
                  <h6 className="text-decoration-none fs-6 text-capitalize text-info">
                    {post.author.name}
                  </h6>
                </Link>
                <p>{post.created}</p>
              </div>
            </div>
            <div className="post-heading mt-2">
              <Link
                to={`/${post.author.username}/${post.slug}`}
                className="text-decoration-none text-white"
              >
                <h4 className="">{post.title}</h4>
              </Link>
            </div>
            <div className="post-desc">
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
            </div>
            <div className="card-footer d-flex justify-content-between">
              <div className="reaction-container d-flex">
                <div className="like-container me-2">
                  <i className="bi bi-suit-heart" /> <span>34 Likes</span>
                </div>
                <div className="comment-container">
                  <i className="bi bi-chat" /> <span>46 Comments</span>
                </div>
              </div>
              <div className="save-container">
                <i className="bi bi-bookmark" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
};
export default PostCard;
