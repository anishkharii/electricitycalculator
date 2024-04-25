import React, { useEffect, useState } from "react";

const Loader = (props) => {
  var windowY = Math.floor(window.scrollY);
 
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  
  return (
    <>
      <div
        style={{ top: `${windowY}px` }}
        className={`absolute z-30  left-0 w-full h-full bg-black/30 backdrop-filter backdrop-blur-sm`}
      >
        <div className="relative top-1/2">
          <div
            className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
          >
            <div className="logo-loader"></div>
            <div className="text-loader "></div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Loader;
