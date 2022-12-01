import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import AuthContext from "./context/AuthContext";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostContext from "./context/PostContext";

function App() {
  const { isLoggedin, username, getUserInfo } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo(username);
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/:username/:slug" exact element={<DetailsPage />} />
        <Route
          path="/signin"
          element={isLoggedin ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={isLoggedin ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/create"
          element={isLoggedin ? <CreatePost /> : <Signin />}
        />
        <Route
          path="/profile/:username"
          // element={<UserProfile/>}
          element={isLoggedin ? <UserProfile /> : <Signin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
