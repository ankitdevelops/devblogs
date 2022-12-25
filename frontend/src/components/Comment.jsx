import React, { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import PostContext from "../context/PostContext";

const Comment = () => {
  const { singlePostComment, getPostComments, post, addComment } =
    useContext(PostContext);

  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", content);
    formData.append("blogSlug", post.slug);
    await addComment(formData);
    setLoad(true);
    setContent("");
  };

  useEffect(() => {
    if (post) {
      getPostComments(post.slug);
      setLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <div>
      <div className="card p-3 my-2">
        <div className="card-title">
          <h3>Comments ({post.comments_count})</h3>
          <hr />
        </div>
        {/* comment form */}
        {/* <CommentForm slug={postData.slug} /> */}
        <div
          className=" card card-body "
          style={{ border: "1px solid #505050" }}
        >
          <div className="row ">
            <div className="col-2">
              <div className="user-info">
                <div className="user-profile text-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/78.jpg"
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                    className="rounded-circle"
                  />
                  <h6 className="text-break my-2">Sheetal Rani</h6>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div className="content p-2">
                <textarea
                  className="p-2 rounded-3"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    backgroundColor: "#171717",
                    color: "#FFF",
                  }}
                ></textarea>
                <button
                  className="btn btn-primary float-end"
                  onClick={onSubmit}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        {singlePostComment &&
          singlePostComment.map((comment, index) => (
            <CommentCard comment={comment} slug={post.slug} key={index} />
          ))}

        {/* comments end */}
      </div>
    </div>
  );
};

export default Comment;
