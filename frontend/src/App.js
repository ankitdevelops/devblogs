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
import EditPost from "./pages/EditPost";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import ReadingList from "./pages/ReadingList";
import CategoryPage from "./pages/CategoryPage";
import UserEditPage from "./pages/UserEditPage";

function App() {
  const { isLoggedin, getUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedin) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/search" exact element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />

        <Route path="/:username/:slug" exact element={<DetailsPage />} />
        <Route path="/:username/edit/" exact element={<UserEditPage />} />

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
          path="/dashboard"
          element={isLoggedin ? <Dashboard /> : <Signin />}
        />
        <Route
          path="/profile/:username"
          element={isLoggedin ? <UserProfile /> : <Signin />}
        />
        <Route
          path="/saved"
          element={isLoggedin ? <ReadingList /> : <Signin />}
        />
        <Route
          path="/:username/:slug/edit"
          exact
          element={isLoggedin ? <EditPost /> : <Signin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
