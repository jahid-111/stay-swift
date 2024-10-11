import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <div className="loader"></div>
      <p className="inline-block text-xl">Loading...</p>
    </div>
  );
};

export default Loading;
