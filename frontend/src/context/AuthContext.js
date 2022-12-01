import { createContext, useState, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedin: localStorage.getItem("accessToken") ? true : false,
    username: localStorage.getItem("username")
      ? JSON.parse(localStorage.getItem("username"))
      : null,
    loading: true,
    userInfo: [],
  };
  // useEffect(() => {

  // },[])
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (user) => {
    const baseUrl = "http://127.0.0.1:8000/api/user/login/";
    axios
      .post(baseUrl, user)
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.access)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.data.refresh)
          );

          const token = response.data.access;
          const decodedToken = jwt_decode(token);
          localStorage.setItem(
            "username",
            JSON.stringify(decodedToken.username)
          );
        }
        dispatch({
          type: "LOGIN",
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // SignUp Function
  const signup = async (user) => {
    const baseUrl = "http://127.0.0.1:8000/api/user/register/";
    axios
      .post(baseUrl, user)
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.tokens.access)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.data.tokens.refresh)
          );

          localStorage.setItem(
            "username",
            JSON.stringify(response.data.user.username)
          );
        }
        dispatch({
          type: "SIGNUP",
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Logged in User Info

  const getUserInfo = async (username) => {
    const url = `http://127.0.0.1:8000/api/user/${username}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
          dispatch({
            type: "SET_USERINFO",
            payload: response.data[0],
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        getUserInfo,
        username: state.username,
        isLoggedin: state.isLoggedin,
        userInfo: state.userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
