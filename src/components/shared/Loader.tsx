import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    </div>
  );
};

export default Loader;
