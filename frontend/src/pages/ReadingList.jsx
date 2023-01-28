import React, { useContext, useEffect } from "react";
import PostContext from "../context/PostContext";
import DotLoader from "react-spinners/DotLoader";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";

const ReadingList = () => {
  const { getSavedPost, savedPost } = useContext(PostContext);

  useEffect(() => {
    getSavedPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Categories />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          {savedPost && (
            <>
              <h3>
                Posts Saved By You
                <span className="badge text-bg-warning ms-2">
                  {savedPost.length}
                </span>
              </h3>
              <hr />
            </>
          )}
          {savedPost &&
            savedPost.map((post, index) => (
              <div className="card card-body mb-2" key={index}>
                <div className="author-profile ">
                  <div className="author-img  ">
                    <img
                      src={post.post.author.avatar}
                      alt=""
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="author-info ms-2">
                    <Link to={`/profile/${post.post.author.username}`}>
                      <h6 className="text-decoration-none fs-6 text-capitalize text-info">
                        {post.post.author.name}
                      </h6>
                    </Link>
                    <p>{post.created}</p>
                  </div>
                </div>
                <div className="post-heading mt-2">
                  <Link
                    to={`/${post.post.author.username}/${post.post.slug}`}
                    className="text-decoration-none text-white"
                  >
                    <h4 className="">{post.post.title}</h4>
                  </Link>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <div className="reaction-container d-flex">
                    <div className="like-container me-2">
                      <i className="bi bi-suit-heart" />{" "}
                      <span>{post.post.likes_count} Likes</span>
                    </div>
                    <div className="comment-container">
                      <i className="bi bi-chat" />{" "}
                      <span>{post.post.comments_count} Comments</span>
                    </div>
                  </div>
                  <div className="save-container">
                    <i className="bi bi-bookmark" />{" "}
                    <span>{post.post.reading_list_count} Times Saved</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3 text-white p-0"></div>
      </div>
    </main>
  );
};

export default ReadingList;
