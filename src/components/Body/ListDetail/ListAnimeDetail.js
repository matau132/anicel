import React, { memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import Card from "../../UI/Card";
import CardSkeleton from "../../UI/CardSkeleton";
import "./ListAnimeDetail.css";

function ListAnimeDetail({ animeList, loadMore, hasMore }) {
  return (
    <div className="list-anime-detail-wrapper">
      {animeList?.length !== 0 && (
        <InfiniteScroll
          dataLength={animeList.length}
          next={loadMore}
          hasMore={hasMore}
          className="row"
        >
          {animeList.map((data) => {
            return (
              <LazyLoad
                className="col-lg-3 col-md-4 col-6 mb-3"
                key={data.id}
                offset={-100}
                placeholder={<CardSkeleton />}
              >
                <Card anime={data} rating={true}></Card>
              </LazyLoad>
            );
          })}
        </InfiniteScroll>
      )}

      {animeList?.length === 0 && <p className="text-center mt-3">No Data.</p>}
    </div>
  );
}

export default memo(ListAnimeDetail);
