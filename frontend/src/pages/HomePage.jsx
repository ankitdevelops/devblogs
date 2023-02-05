import React, { useEffect, useContext } from "react";
import PostCard from "../components/PostCard";
import FeaturedPost from "../components/FeaturedPost";
import Categories from "../components/Categories";
import PostContext from "../context/PostContext";

const HomePage = () => {
  const { getPosts, getFeaturedPosts, posts, clearDetailsPageContext } =
    useContext(PostContext);
  useEffect(() => {
    clearDetailsPageContext();
    getPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFeaturedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);
  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Categories />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          <PostCard posts={posts} />
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3 text-white p-0">
          <FeaturedPost />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
