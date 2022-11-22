import { createContext, useState, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const initialState = {
		isLoggedin: localStorage.getItem("accessToken") ? true : false,
		user: useState(null),
		loading: true,
	};
	// useEffect(() => {

	// },[])
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = async (user) => {
		const response = axios({
			method: "post",
			url: "http://127.0.0.1:8000/api/user/login/",
			data: user,
		});
		const { data } = await response;
		console.log("first", data);
		if (data) {
			localStorage.setItem("accessToken", JSON.stringify(data.access));
			localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
		}
		dispatch({
			type: "LOGIN",
			payload: data,
		});
	};

	const signup = async (user) => {
		const response = axios({
			method: "post",
			url: "http://127.0.0.1:8000/api/user/register/",
			data: user,
		});
		const { data } = await response;
		console.log("first", data);
		if (data) {
			localStorage.setItem("authToken", JSON.stringify(data.tokens.access));
			console.log(data);
		}
		dispatch({
			type: "SIGNUP",
			payload: data,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				// authToken: state.authToken,
				login,
				signup,
				isLoggedin: state.isLoggedin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
