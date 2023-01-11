import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PostContext from "../context/PostContext";
import AuthContext from "../context/AuthContext";
import PostImage from "../components/PostImage";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);
  const { addPost } = useContext(PostContext);

  const user = userInfo.username;

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail[0]);
    console.log(formData);
    await addPost(formData);
    navigate(`/`);
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
                className="form-control my-2 p-3 shadow-none"
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

              <hr />
              <ul className="nav my-2f d-flex justify-content-around align-items-center">
                <li className="nav-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">Thumbnail</div>
                    <div className="col-auto">
                      <input
                        type="file"
                        className="form-control"
                        required
                        accept="image/*"
                        id="thumbnail"
                        multiple={false}
                        style={{ display: "none " }}
                        onChange={(e) =>
                          setThumbnail([...thumbnail, e.target.files[0]])
                        }
                      />
                      <label htmlFor="thumbnail" className="btn btn-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor "
                          className="bi bi-cloud-arrow-up me-2  "
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                          />
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                        Upload
                      </label>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="col-form-label">Category</label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option defaultValue>Category</option>
                        <option value="html" className="text-upper">
                          HTML
                        </option>
                        <option value="javascript" className="text-upper">
                          JavaScript
                        </option>
                        <option value="css" className="text-upper">
                          CSS
                        </option>
                        <option value="tutorials" className="text-upper">
                          Tutorials
                        </option>
                        <option value="django" className="text-upper">
                          Django
                        </option>
                        <option value="python" className="text-upper">
                          Python
                        </option>
                        <option value="others" className="text-upper">
                          Others
                        </option>
                      </select>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="col-form-label">Status</label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select my-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option defaultValue>Status</option>
                        <option value="draft">DRAFT</option>
                        <option value="published">PUBLISHED</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-grid gap-2">
                    <button
                      className={
                        preview ? "btn btn-dark my-2" : "btn btn-light my-2"
                      }
                      onClick={(e) => handlePreview(e)}
                    >
                      {preview ? "Edit" : "Preview"}
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="d-grid gap-2">
                    <button
                      className="btn-warning btn  btn-block"
                      onClick={(e) => onSubmit(e)}
                    >
                      Post Now
                    </button>
                  </div>
                </li>
              </ul>
              <hr />

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
                  className="form-control my-2 content-input shadow-none"
                ></textarea>
              )}
            </form>
          </div>
          <div className="col-md-2">
            {/* <div className="card card-body mt-2">
              <h6>Your Uploaded Images </h6>
              <hr />
              <ul className="list-group list-group-flush ">
                <li className="list-group-item d-flex justify-content-between align-content-center">
                  <a href="https://getbootstrap.com/docs/5.3/components/navs-tabs/">
                    View
                  </a>
                  <span
                    className="badge rounded-pill text-bg-primary"
                    role="button"
                  >
                    Copy
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-content-center">
                  <a href="https://getbootstrap.com/docs/5.3/components/navs-tabs/">
                    View
                  </a>
                  <span
                    className="badge rounded-pill text-bg-primary"
                    role="button"
                  >
                    Copy
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-content-center">
                  <a href="https://getbootstrap.com/docs/5.3/components/navs-tabs/">
                    View
                  </a>
                  <span
                    className="badge rounded-pill text-bg-primary"
                    role="button"
                  >
                    Copy
                  </span>
                </li>
              </ul>
            </div> */}
            <PostImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
