import React from "react";
import { Link } from "react-router-dom";
import FeaturedPost from "./FeaturedPost";
const RightPanel = () => {
  let index;
  return (
    <>
      {/* do in a list group */}

      <div className="card card-body p-1">
        <FeaturedPost />
      </div>
    </>
  );
};

export default RightPanel;
