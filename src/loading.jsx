import React, {memo} from 'react';
import { CgSpinner } from "react-icons/cg";

function Loading(){
  return (
    <div className="flex justify-center items-center h-screen">
      <CgSpinner className="animate-spin text-5xl text-gray-500" />
    </div>
  );
}

export default memo(Loading);