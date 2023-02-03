import React, { useContext } from "react";
import PostContext from "../context/PostContext";
import AuthContext from "../context/AuthContext";

const SaveButton = () => {
  const { post, savePost, postSaveStatusByLoggedInUser } =
    useContext(PostContext);
  const { isLoggedin } = useContext(AuthContext);

  const handleSave = async () => {
    let formData = new FormData();
    formData.append("slug", post.slug);
    await savePost(formData);
  };

  return (
    <div>
      <div className="like-save mt-3">
        <div className="text-center">
          <div className="follow-btn">
            <div className="d-grid gap-2">
              {postSaveStatusByLoggedInUser !== null && isLoggedin && (
                <span>
                  {postSaveStatusByLoggedInUser ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="currentColor"
                        className="bi bi-bookmark-fill"
                        viewBox="0 0 16 16"
                        role="button"
                        onClick={handleSave}
                      >
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="currentColor"
                        className="bi bi-bookmark"
                        viewBox="0 0 16 16"
                        role="button"
                        onClick={handleSave}
                      >
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                      </svg>
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveButton;
