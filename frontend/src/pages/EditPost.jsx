import React, { useState, useContext, useEffect } from "react";
import PostContext from "../context/PostContext";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

const EditPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { userInfo } = useContext(AuthContext);
  const { getSinglePost, post, updatePost } = useContext(PostContext);
  const user = userInfo.username;

  // calling the function
  useEffect(() => {
    getSinglePost(slug);
    if (post) {
      if (post.author.username !== user) {
        toast.error("You don't have permission to edit this post.");
      }
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      if (post.author.username !== user) {
        toast.error("You don't have permission to edit this post.");
      } else {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setStatus(post.status);
        setImage(post.thumbnail);
      }
    }
  }, [post]);

  // state

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [status, setStatus] = useState(post ? post.status : "");
  const [thumbnail, setThumbnail] = useState([]);
  const [preview, setPreview] = useState("false");
  const [image, setImage] = useState("");
  // const [newThumbnail, setNewThumbnail] = useState(false);

  // handling forms
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (post.title !== title) {
      formData.append("title", title);
    }
    if (post.content !== content) {
      formData.append("content", content);
    }
    if (post.category !== category) {
      formData.append("category", category);
    }
    if (post.status !== status) {
      formData.append("status", status);
    }
    if (thumbnail.length !== 0) {
      formData.append("thumbnail", thumbnail[0]);
    }
    await updatePost(post.slug, formData);
    navigate(`/profile/${user}`);
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
                    <div className="col-auto d-flex align-items-center">
                      <img
                        src={image}
                        alt="post-thumbnail"
                        style={{
                          width: "140px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <input
                        className="form-control mx-5"
                        type="file"
                        id="formFile"
                        style={{ width: "60%" }}
                        accept="image/*"
                        multiple={false}
                        onChange={(e) =>
                          setThumbnail([...thumbnail, e.target.files[0]])
                        }
                      ></input>
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
            <div className="d-grid gap-2">
              <button
                className="btn-warning btn mt-2 btn-block"
                onClick={(e) => onSubmit(e)}
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
