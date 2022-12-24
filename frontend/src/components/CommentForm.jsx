import React, { useState, useContext, useEffect } from "react";
import PostContext from "../context/PostContext";

const CommentForm = ({ slug }) => {
  const { addComment, post } = useContext(PostContext);
  const [content, setContent] = useState("");

  useEffect(() => {}, [post]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", content);
    formData.append("blogSlug", slug);
    await addComment(formData);
    setContent("");
  };

  return (
    <div>
      <div className=" card card-body " style={{ border: "1px solid #505050" }}>
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
              <button className="btn btn-primary float-end" onClick={onSubmit}>
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
