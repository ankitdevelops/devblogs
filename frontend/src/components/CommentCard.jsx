import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div>
      <div
        className=" card card-body mt-2 "
        style={{ border: "1px solid #505050" }}
      >
        <div className="row ">
          <div className="col-12 col-sm-2">
            <div className="user-info">
              <div className="user-profile text-center">
                <img
                  src={comment.user.avatar}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                  className="rounded-circle"
                />
                <h6 className="text-break my-2">{comment.user.name}</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-10">
            <div className="content p-2 text-center text-sm-start">
              {comment.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
