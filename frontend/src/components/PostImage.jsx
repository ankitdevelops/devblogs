import React, { useContext, useEffect, useState } from "react";
import PostContext from "../context/PostContext";
const PostImage = () => {
  const { getPostImages, postImages, uploadPostImages } =
    useContext(PostContext);

  const [image, setImage] = useState([]);

  if (image.length !== 0) {
    let formData = new FormData();
    formData.append("image", image[0]);
    uploadPostImages(formData);
    setImage([]);
  }

  useEffect(() => {
    getPostImages();
  }, []);

  return (
    <div>
      <div className="card card-body mt-2">
        <div className="d-grid gap-2">
          <input
            type="file"
            name="upload-file"
            id="img"
            multiple={false}
            className=" file-input"
            onChange={(e) => setImage([...image, e.target.files[0]])}
          />
          <label htmlFor="img" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor "
              className="bi bi-cloud-arrow-up me-2  "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
              />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
            Upload Image
          </label>
        </div>
      </div>
      <div className="card card-body mt-2">
        <h6>Your Uploaded Images </h6>
        <hr />
        <ul className="list-group list-group-flush ">
          {postImages &&
            postImages.map((image, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-content-center"
                key={index}
              >
                <a href={image.image} target="_blank" rel="noreferrer">
                  View
                </a>
                <span
                  className="badge rounded-pill text-bg-primary"
                  role="button"
                >
                  Copy Link
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostImage;
