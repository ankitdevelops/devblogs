import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import PostContext from "../context/PostContext";
import DotLoader from "react-spinners/DotLoader";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const { slug } = useParams();
  const { getSinglePost, post } = useContext(PostContext);
  useEffect(() => {
    getSinglePost(slug);
  }, [slug]);
  console.log(post);
  if (!post) {
    return (
      <>
        <div className="loader d-flex justify-content-center mt-5">
          <DotLoader color="#fff" size={50} />
        </div>
      </>
    );
  }

  return (
    <main className="my-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <LeftPanel />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          <div className="card p-3">
            <div className="thumbnail-container">
              <img
                src={`${post.thumbnail}`}
                title=""
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="article-title">
              <h6 className="my-3 text-warning">
                {post.category.toUpperCase()}
              </h6>
              <h2 className="my-3">{post.title.toUpperCase()}</h2>
              <div className="media d-flex align-items-center ">
                <div className="avatar">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    title=""
                    alt=""
                    style={{
                      height: "80px",
                      width: "auto",
                      borderRadius: "50px",
                    }}
                  />
                </div>
                <div className="media-body ms-2">
                  <p>
                    {post.author.name.charAt(0).toUpperCase() +
                      post.author.name.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="article-content my-3">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3">
          <div className="author-profile">
            <div className="card card-body">
              <div className="author-img text-center my-2">
                <img
                  src={post.author.avatar}
                  alt="author-img"
                  height={150}
                  width={150}
                  style={{ borderRadius: "50px" }}
                />
              </div>
              <h3 className="text-center my-2 h6">
                <Link className="text-decoration-none text-white">
                  {post.author.name.charAt(0).toUpperCase() +
                    post.author.name.slice(1)}
                </Link>
              </h3>

              <div className="follow-btn">
                <div className="d-grid gap-2">
                  <Link
                    to={`/profile/${post.author.username}`}
                    className="btn-primary btn mt-2 btn-block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="author-post mt-3">
            <div className="card card-body">
              <ul className="list-group list-group-flush ">
                <li className="list-group-item ">
                  <h5>
                    {post.author.name.charAt(0).toUpperCase() +
                      post.author.name.slice(1)}
                    's Post
                  </h5>
                </li>
                <Link className="list-group-item list-group-item">An item</Link>
                <Link className="list-group-item list-group-item">
                  A second item
                </Link>
                <Link className="list-group-item list-group-item">
                  A third item
                </Link>
                <Link className="list-group-item list-group-item">
                  A fourth item
                </Link>
                <Link className="list-group-item list-group-item">
                  And a fifth one
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
