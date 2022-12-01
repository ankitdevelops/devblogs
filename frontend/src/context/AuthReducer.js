const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loading: false,
        isLoggedin: true,
      };
    case "SIGNUP":
      return {
        ...state,
        isLoggedin: true,
        user: action.payload.user,
        loading: false,
      };

    case "SET_USERINFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
