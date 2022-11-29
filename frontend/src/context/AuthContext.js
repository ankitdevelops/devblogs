import { createContext, useState, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedin: localStorage.getItem("accessToken") ? true : false,
    user: localStorage.getItem("username")
      ? JSON.parse(localStorage.getItem("username"))
      : null,
    loading: true,
    userInfo: null,
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
    //
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
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
