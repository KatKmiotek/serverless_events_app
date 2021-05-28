import React from "react";

const browser = typeof window !== "undefined" && window;

const notFoundPage = () => {
  return (
    browser && (
      <div>
        <h1>404 error content...</h1>
      </div>
    )
  );
};
export default notFoundPage;
