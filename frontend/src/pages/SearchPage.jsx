import React, { useContext } from "react";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostContext from "../context/PostContext";

const SearchPage = () => {
  const { searchResults } = useContext(PostContext);
  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Categories />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          <PostCard posts={searchResults} />
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3 text-white p-0"></div>
      </div>
    </main>
  );
};

export default SearchPage;
