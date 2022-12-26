import React, { useContext, useEffect, useState } from "react";
import PostContext from "../context/PostContext";

const Like = () => {
  const {
    getSinglePost,
    post,
    likePost,
    postLikeStatusByLoggedInUser,
    userPostLikedStatus,
  } = useContext(PostContext);
  const [load, setLoad] = useState(false);
  const handleLike = async () => {
    let formData = new FormData();
    formData.append("slug", post.slug);
    await likePost(formData);
    setLoad(true);
  };

  useEffect(() => {
    if (post) {
      userPostLikedStatus(post.slug);
      setLoad(false);
    }
  }, [load]);

  return (
    <div>
      {" "}
      <div className="like-save mt-3">
        <div className="card card-body">
          <div className="follow-btn">
            <div className="d-grid gap-2">
              <button
                className=" btn btn-primary mt-2 d-flex justify-content-center align-items-center"
                onClick={handleLike}
              >
                {postLikeStatusByLoggedInUser !== null && (
                  <span>
                    {postLikeStatusByLoggedInUser ? (
                      <>Unlike This Post</>
                    ) : (
                      <>Like This Post</>
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Like;
