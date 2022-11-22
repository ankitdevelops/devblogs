import { createContext, useReducer } from "react";
import postReducer from "./PostReducer";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
	const initialState = {
		posts: [],
		loading: true,
		post:null
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	// get post

	const getPosts = async () => {
		const response = axios.get("http://127.0.0.1:8000/api/blogs/");

		const { data } = await response;
		//
		dispatch({
			type: "GET_POSTS",
			payload: data,
		});
	};

	//  add new post

	const addPost = async (post) => {
		const response = axios.post("http://127.0.0.1:8000/api/blogs/", post, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem("accessToken")
				)}`,
			},
		});
		const { data } = await response;

		dispatch({
			type: "ADD_POST",
			payload: data,
		});
	};

	// get single post

	const getSinglePost = async (slug) => {
		const response = axios.get(`http://127.0.0.1:8000/api/blogs/${slug}/`);

		const { data } = await response;
		dispatch({
			type: "GET_SINGLE_POSTS",
			payload: data,
		});
	}

	return (
		<PostContext.Provider
			value={{
				posts: state.posts,
				getPosts,
				addPost,
				getSinglePost,
				post:state.post
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
