import React from "react";

const ButtonLoading = () => {
  return (
    <button className="btn font-semibold text-base text-white bg-purple-600 hover:bg-purple-700 w-full">
      <span className="loading loading-spinner"></span>
    </button>
  );
};

export default ButtonLoading;
