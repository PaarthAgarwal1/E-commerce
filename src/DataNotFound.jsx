import React, { memo } from 'react';


function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        className="h-60"
        src="https://cdn3.iconfinder.com/data/icons/web-development-and-programming-2/64/development_Not_Found-1024.png"
        alt="Not Found"
      />
      <h1 className="text-6xl font-extrabold text-gray-400">Page Not Found</h1>
    </div>
  );
}

export default memo(NotFound);
