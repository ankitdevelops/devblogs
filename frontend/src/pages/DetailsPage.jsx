import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostContext from "../context/PostContext";
import DotLoader from "react-spinners/DotLoader";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Comment from "../components/Comment";
import Like from "../components/Like";
import SaveButton from "../components/SaveButton";

const DetailsPage = () => {
  const { slug, username } = useParams();
  const {
    getSinglePost,
    post,
    postLikeStatusByLoggedInUser,
    userPostLikedStatus,
    postSaveStatusByLoggedInUser,
    userPostSavedStatus,
    clearDetailsPageContext,
    clearSaveContext,
    clearLikeContext,
  } = useContext(PostContext);
  const { userInfo, isLoggedin, getUserProfile, userProfile } =
    useContext(AuthContext);
  useEffect(() => {
    clearDetailsPageContext();
    clearSaveContext();
    clearLikeContext();

    getSinglePost(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (post && isLoggedin) {
      userPostSavedStatus(post.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, postSaveStatusByLoggedInUser]);

  useEffect(() => {
    if (post && isLoggedin) {
      userPostLikedStatus(post.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, postLikeStatusByLoggedInUser]);

  useEffect(() => {
    getUserProfile(username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin]);

  const monthNameList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

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
      <div className="row container">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Like />
          <div className="mt-5">
            <SaveButton />
          </div>
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

              <div className="d-flex justify-content-between">
                <h2 className="my-3">{post.title.toUpperCase()}</h2>

                <div>
                  {userInfo.username === post.author.username && (
                    <Link
                      to={`/${post.author.username}/${post.slug}/edit`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
              <div className="media d-flex align-items-center ">
                <div className="avatar">
                  <img
                    src={post.author.avatar}
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
                  <h6 className="opacity-50">
                    {post.author.name.charAt(0).toUpperCase() +
                      post.author.name.slice(1)}
                  </h6>
                  <h6 className="opacity-50">
                    <small>Published On </small>
                    {`${
                      monthNameList[new Date(post.created).getMonth()]
                    }, ${new Date(post.created).getDate()}, ${new Date(
                      post.created
                    ).getFullYear()}`}
                  </h6>
                </div>
              </div>
            </div>
            <div className="article-content my-3">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
          {/* comment */}
          <Comment postData={post} commentsCount={post.comments_count} />
          {/* comment end */}
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
                {userProfile.authorBlogs &&
                  userProfile.authorBlogs.map((post, index) => (
                    <Link
                      to={`/${post.author.username}/${post.slug}`}
                      key={index}
                      className="list-group-item list-group-item"
                    >
                      {post.title}
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
