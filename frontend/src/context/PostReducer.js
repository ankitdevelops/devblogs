const postReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case "ADD_POST":
      return { ...state, posts: action.payload, ...state.posts };

    case "GET_SINGLE_POSTS":
      return { ...state, post: action.payload };

    case "GET_FEATURED_POSTS":
      return {
        ...state,
        featuredPosts: action.payload,
      };

    case "GET_COMMENT":
      return {
        ...state,
        singlePostComment: action.payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        singlePostComment: action.payload,
        ...state.singlePostComment,
      };

    case "LIKE_STATUS":
      return {
        ...state,
        postLikeStatusByLoggedInUser: action.payload,
      };
    case "ADD_LIKE":
      return {
        ...state,
        postLikeStatusByLoggedInUser: !state.postLikeStatusByLoggedInUser,
      };

    default:
      return state;
  }
};

export default postReducer;
