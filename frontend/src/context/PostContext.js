import { createContext, useReducer } from "react";
import postReducer from "./PostReducer";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const initialState = {
    posts: [],
    loading: true,
    post: null,
    featuredPosts: [],
    singlePostComment: [],
  };
  const [state, dispatch] = useReducer(postReducer, initialState);

  // get all posts

  const getPosts = async () => {
    const url = "http://127.0.0.1:8000/api/blogs/";
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error", error.message);
        toast.success(error.message);
      });
  };

  //  add new post

  const addPost = async (post) => {
    const url = "http://127.0.0.1:8000/api/blogs/";
    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, post, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "ADD_POST",
            payload: response.data,
          });
        }
        toast.success("Post Created Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  // update post

  const updatePost = async (slug, data) => {
    const url = `http://127.0.0.1:8000/api/blogs/${slug}/`;
    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .patch(url, data, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Post Updated Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  // get single post

  const getSinglePost = async (slug) => {
    const url = `http://127.0.0.1:8000/api/blogs/blog/${slug}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_SINGLE_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("Error Message: ", error.message);
        toast.error(error.message);
      });
  };

  // get featured blogs

  const getFeaturedPosts = async () => {
    const url = "http://127.0.0.1:8000/api/blogs/featured/";

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_FEATURED_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // get comment

  const getPostComments = async (slug) => {
    const url = `http://127.0.0.1:8000/api/blogs/comment/${slug}/`;

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_COMMENT",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // post comment
  const addComment = async (data) => {
    const url = "http://127.0.0.1:8000/api/blogs/comment/";

    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, data, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "ADD_COMMENT",
            payload: response.data,
          });
        }
        console.log(response.data);
        toast.success("Comment Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <PostContext.Provider
      value={{
        getPosts,
        addPost,
        getSinglePost,
        getFeaturedPosts,
        updatePost,
        getPostComments,
        addComment,
        posts: state.posts,
        post: state.post,
        featuredPosts: state.featuredPosts,
        singlePostComment: state.singlePostComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
