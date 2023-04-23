import { createContext, useReducer } from "react";
import postReducer from "./PostReducer";
import axios from "axios";
import { toast } from "react-toastify";

const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const initialState = {
    posts: [],
    loading: true,
    post: null,
    featuredPosts: [],
    singlePostComment: [],
    postLikeStatusByLoggedInUser: false,
    postSaveStatusByLoggedInUser: false,
    savedPost: [],
    searchResults: [],
    categoryResults: [],
    postImages: [],
  };
  const [state, dispatch] = useReducer(postReducer, initialState);

  // get all posts

  const getPosts = async () => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/";
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        // console.log("error", error.message);
        toast.success(error.message);
      });
  };

  //  add new post

  const addPost = async (post) => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/";
    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, post, { headers: config })
      .then((response) => {
        if (response.status === 201) {
          // console.log(response.data);
          dispatch({
            type: "ADD_POST",
            payload: response.data,
          });
        }
        toast.success("Post Created Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  // update post

  const updatePost = async (slug, data) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/blog/${slug}/`;
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
        // console.log(error);
        toast.error(error.message);
      });
  };

  // get single post

  const getSinglePost = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/blog/${slug}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_SINGLE_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        // console.log("Error Message: ", error.message);
        toast.error(error.message);
      });
  };

  const clearDetailsPageContext = () => {
    dispatch({
      type: "CLEAR_POST_CONTEXT",
    });
  };

  // get featured blogs

  const getFeaturedPosts = async () => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/featured/";

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
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/comment/${slug}/`;

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
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/comment/";

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
        toast.success("Comment Added Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  // like post
  const likePost = async (data) => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/like/";

    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, data, { headers: config })
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: "ADD_LIKE",
          });
        }
        if (state.postLikeStatusByLoggedInUser === true) {
          toast.success("Post UnLiked Successfully");
        }

        if (state.postLikeStatusByLoggedInUser === false) {
          toast.success("Post Liked Successfully");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  const clearLikeContext = () => {
    dispatch({
      type: "CLEAR_LIKE_CONTEXT",
    });
  };

  // user post liked status
  const userPostLikedStatus = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/like/${slug}/`;

    const config = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };

    axios
      .get(url, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "LIKE_STATUS",
            payload: response.data.status,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // add post to reading list
  const savePost = async (data) => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/reading-list/";

    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, data, { headers: config })
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: "SAVE_POST",
          });
        }
        if (state.postSaveStatusByLoggedInUser === true) {
          toast.success("Post Removed From Your Reading List ");
        }

        if (state.postSaveStatusByLoggedInUser === false) {
          toast.success("Post Added To Your Reading List");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  // check post saved by user
  const userPostSavedStatus = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/reading-list/${slug}/`;

    const config = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };

    axios
      .get(url, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "SAVE_STATUS",
            payload: response.data.status,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const clearSaveContext = () => {
    dispatch({
      type: "CLEAR_SAVE_CONTEXT",
    });
  };

  // get post by category
  const getCategoryPosts = async (category) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/blog/category/${category}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_CATEGORY_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        // console.log("error", error.message);
        toast.success(error.message);
      });
  };

  // search post
  const searchPost = async (keyword) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/blog/search/${keyword}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "SEARCH_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        // console.log("error", error.message);
        toast.success(error.message);
      });
  };

  // delete post
  const deletePost = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/blog/${slug}/`;

    const config = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };

    axios
      .delete(url, { headers: config })
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: "DELETE_POST",
            payload: slug,
          });
          toast.success("Post Deleted Successfully");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error);
      });
  };

  // get user saved post
  const getSavedPost = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/reading-list/`;
    const config = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };

    axios
      .get(url, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_SAVED_POSTS",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // upload post images
  const uploadPostImages = async (data) => {
    const url = "https://hiankit09.pythonanywhere.com/api/blogs/images/";

    const config = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .post(url, data, { headers: config })
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: "ADD_POST_IMAGE",
            payload: response.data,
          });
        }
        toast.success("Image Added Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  // get post images
  const getPostImages = async (slug) => {
    const url = `https://hiankit09.pythonanywhere.com/api/blogs/images/`;
    const config = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };

    axios
      .get(url, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_POST_IMAGES",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
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
        likePost,
        userPostLikedStatus,
        userPostSavedStatus,
        savePost,
        getCategoryPosts,
        searchPost,
        deletePost,
        getSavedPost,
        getPostImages,
        uploadPostImages,
        clearDetailsPageContext,
        clearLikeContext,
        clearSaveContext,
        posts: state.posts,
        post: state.post,
        featuredPosts: state.featuredPosts,
        singlePostComment: state.singlePostComment,
        postLikeStatusByLoggedInUser: state.postLikeStatusByLoggedInUser,
        postSaveStatusByLoggedInUser: state.postSaveStatusByLoggedInUser,
        savedPost: state.savedPost,
        searchResults: state.searchResults,
        categoryResults: state.categoryResults,
        postImages: state.postImages,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
