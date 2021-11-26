import React, { memo } from "react";
import "./Sidebar.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SideBarAnimeSkeleton() {
  return (
    <div
      className="d-flex flex-wrap recommend-anime-wrapper mb-4"
      style={{ overflow: "hidden" }}
    >
      <div className="recommend-img mr-4">
        <Skeleton width="73px" height="73px"></Skeleton>
      </div>
      <div className="recommend-info">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}

export default memo(SideBarAnimeSkeleton);
