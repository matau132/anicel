import React, { memo } from "react";
import "./Card.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CardSkeleton.css";

function CardSkeleton() {
  return (
    <div className="card-wrapper">
      <div className="card p-0">
        <div className="image-over image-skeleton">
          <Skeleton className="card-img-top" height="100%" width="100%" />
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body anime-card-body pt-0">
            <h5 className="mb-0 anime-card-title mt-3" title="">
              <Skeleton />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CardSkeleton);
