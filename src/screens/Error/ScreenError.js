import React, { memo } from "react";
import { NavLink } from "react-router-dom";

function ScreenError() {
  return (
    <div className="text-center container">
      <p className="text-white mt-5">Something went wrong!</p>
      <div>
        <span className="mr-2" style={{ color: "rgba(156, 163, 175, 1)" }}>
          Head back
        </span>
        <NavLink to="/" exact>Home</NavLink>
      </div>
    </div>
  );
}

export default memo(ScreenError);
