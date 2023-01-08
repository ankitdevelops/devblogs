import React, { useContext, useEffect } from "react";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostContext from "../context/PostContext";
import { useParams } from "react-router-dom";
import FeaturedPost from "../components/FeaturedPost";

const CategoryPage = () => {
  const { categoryResults, getCategoryPosts } = useContext(PostContext);
  const { category } = useParams();
  useEffect(() => {
    getCategoryPosts(category);
  }, [category]);

  return (
    <main className="mt-3">
      <div className="row container  ">
        <div className="mx-auto d-none d-sm-block col-sm-2 col-md-2  text-white">
          <Categories />
        </div>
        <div className="mx-auto col-sm-7 col-md-7  ">
          {categoryResults && (
            <>
              <button type="button" className="btn btn-warning fw-semibold">
                {category.toUpperCase()}{" "}
                <span className="badge text-bg-secondary">
                  {categoryResults.length}
                </span>
              </button>
              <hr />
            </>
          )}
          <PostCard posts={categoryResults} />
        </div>
        <div className="d-none d-sm-block mx-auto col-sm-3 col-md-3 text-white p-0">
          <FeaturedPost />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
