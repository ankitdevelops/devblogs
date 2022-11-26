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
    singleUser: {},
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
        if (response.status == 200) {
          dispatch({
            type: "ADD_POST",
            payload: response.data,
          });
        }
        toast.success("Post Created Successfully");
      })
      .catch((error) => {
        console.log("Error Message: ", error.message);
        toast.error(error.message);
      });
  };

  // get single post

  const getSinglePost = async (slug) => {
    const url = `http://127.0.0.1:8000/api/blogs/${slug}/`;
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

  // get single user profile
  const getUserProfile = async (username) => {
    const response = axios.get(`http://127.0.0.1:8000/api/user/${username}/`);

    const { data } = await response;
    dispatch({
      type: "GET_SINGLE_USER",
      payload: data[0],
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        getPosts,
        addPost,
        getSinglePost,
        getUserProfile,
        post: state.post,
        singleUser: state.singleUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
