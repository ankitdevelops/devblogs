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
		default:
			return state;
	}
};

export default authReducer;
