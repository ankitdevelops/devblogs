import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { CKEditor } from "ckeditor4-react";
import PostContext from "../context/PostContext";
const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [preview, setPreview] = useState(false);
  const { posts, addPost } = useContext(PostContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail[0]);
    await addPost(formData);
    navigate("/");
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreview(!preview);
  };

  return (
    <>
      <div className="container my-3">
        <div className="row mx-auto">
          <div className="col-md-9 mx-auto card card-body">
            <form>
              <input
                type="text"
                className="form-control my-2 p-3"
                placeholder="An Awesome Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  backgroundColor: "#171717",
                  color: "#fff",
                  fontSize: "1.5rem",
                  border: "none",
                }}
              />

              <ul className="nav my-2">
                <li className="nav-item"></li>
              </ul>

              {preview ? (
                <ReactMarkdown className="content">{content}</ReactMarkdown>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe Your Awesome Tittle"
                  style={{
                    height: "70vh",
                    backgroundColor: "#171717",
                    color: "#FFF",
                    border: "none",
                    fontSize: "1.3rem",
                    resize: "none",
                  }}
                  className="form-control my-2 content-input"
                ></textarea>
              )}
            </form>
          </div>
          <div className="col-md-2">
            <div className="d-grid gap-2">
              <button
                className={preview ? "btn btn-dark my-2" : "btn btn-light my-2"}
                onClick={(e) => handlePreview(e)}
              >
                {preview ? "Edit" : "Preview"}
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="floatingInput">Thumbnail</label>
              <input
                type="file"
                className="form-control"
                required
                accept="image/*"
                multiple={false}
                onChange={(e) =>
                  setThumbnail([...thumbnail, e.target.files[0]])
                }
              />
            </div>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option defaultValue>Category</option>
              <option value="html" className="text-upper">
                HTML
              </option>
              <option value="freebies" className="text-upper">
                freebies
              </option>
              <option value="css" className="text-upper">
                css
              </option>
              <option value="tutorials" className="text-upper">
                tutorials
              </option>
              <option value="others" className="text-upper">
                others
              </option>
            </select>

            <select
              className="form-select my-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option defaultValue>Status</option>
              <option value="draft">DRAFT</option>
              <option value="published">PUBLISHED</option>
            </select>
            <div className="d-grid gap-2">
              <button
                className="btn-warning btn mt-2 btn-block"
                onClick={(e) => onSubmit(e)}
              >
                Post Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
