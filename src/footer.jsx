import React,{memo} from 'react';
function Footer() {
  return(
    <div className="text-white py-2 text-xs lg:text-sm flex-col lg:py-4 bg-gray-700 lg:px-20 flex lg:flex-row items-center justify-between">
      <p>copyright @ 2022 | CodeYogi</p>
      <p>Powered by CodeYogi</p>
    </div>
  );
}
export default memo(Footer);