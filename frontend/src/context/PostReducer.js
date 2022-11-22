const postReducer = (state, action) => {
	switch (action.type) {
		case "GET_POSTS":
			return {
				posts: action.payload,
				loading: false,
			};

		case "ADD_POST":
			return {...state,
				posts: [...state.posts, action.payload],
			};
		
		case "GET_SINGLE_POSTS":
			return {post:action.payload}	
		default:
			return state;
	}
};

export default postReducer;
