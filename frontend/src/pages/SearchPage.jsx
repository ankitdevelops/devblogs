import React from "react";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";

const SearchPage = () => {
  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Categories />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          <PostCard />
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3 text-white p-0"></div>
      </div>
    </main>
  );
};

export default SearchPage;
