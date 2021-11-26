import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import "./Card.css";

function Card({ anime, rating, watching }) {
  const episodeCount = () => {
    if (watching) {
      let episode = (anime.watched < 10 ? "0" : "") + `${anime.watched}`;

      return (
        <span style={{ color: "#fff" }}>
          {episode}/
          {(anime.episodes_count < 10 ? "0" : "") + `${anime.episodes_count}`}
        </span>
      );
    } else {
      let episode =
        (anime.episodes_count < 10 ? "0" : "") + `${anime.episodes_count}`;

      return (
        <span style={{ color: "#fff" }}>
          {anime.status === 2 ? "??" : episode}/
          {anime.status === 0 ? episode : "??"}
        </span>
      );
    }
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="image-over">
          <NavLink to={`/anime/${anime.id}`}>
            <LazyLoad>
              <img
                className="card-img-top"
                src={anime.cover_image}
                alt={anime.titles?.en}
                title={anime.titles?.en}
              />
            </LazyLoad>
          </NavLink>
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body anime-card-body">
            <NavLink to={`/anime/${anime.id}`}>
              <h5
                className="mb-0 anime-card-title mt-3"
                title={anime.titles?.en}
              >
                {anime.titles?.en}
              </h5>
            </NavLink>
            <div className="card-bottom mt-3">
              <i className="far fa-clock mr-1"></i>
              {episodeCount()}
              {rating && (
                <>
                  {window.screen.width < 575 && <br />}
                  <i className="fas fa-star banner-slide-info-score mr-1 ml-sm-3"></i>
                  <span className="banner-slide-info-score">
                    {anime.status === 2 ? "??" : anime.score / 10}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Card);
