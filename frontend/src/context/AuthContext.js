import { createContext, useReducer } from "react";
import authReducer from "./AuthReducer";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedin: localStorage.getItem("accessToken") ? true : false,
    loading: true,
    userInfo: {},
    userProfile: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (user) => {
    const baseUrl = "https://www.devblogs.site/api/user/login/";
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
  const signUp = async (user) => {
    const baseUrl = "https://www.devblogs.site/api/user/register/";
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

  const getUserInfo = async () => {
    const url = `https://www.devblogs.site/api/user/`;
    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    };
    axios
      .get(url, { headers: config })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          dispatch({
            type: "SET_USERINFO",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // User Profile with all data

  const getUserProfile = async (username) => {
    const url = `https://www.devblogs.site/api/user/${username}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_USER_PROFILE",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // update user profile
  const updateUser = async (username, data) => {
    const url = `https://www.devblogs.site/api/user/${username}/`;
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
          toast.success("user Updated Successfully");
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
        getUserInfo,
        getUserProfile,
        updateUser,
        username: state.username,
        isLoggedin: state.isLoggedin,
        userInfo: state.userInfo,
        userProfile: state.userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
