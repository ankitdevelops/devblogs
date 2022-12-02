const postReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] };

    case "GET_SINGLE_POSTS":
      return { ...state, post: action.payload, loading: false };

    case "GET_FEATURED_POSTS":
      return {
        ...state,
        featuredPosts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
