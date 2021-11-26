import React, { memo, useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import SideBarAnimeSkeleton from "./SideBarAnimeSkeleton";
import { NavLink } from "react-router-dom";
import AnimeData from "../../../api/GetData";

function Sidebar() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const animeData = new AnimeData();

  const mounted = useRef(false);

  const episodeCount = (anime) => {
    let episode =
      (anime.episodes_count < 10 ? "0" : "") + `${anime.episodes_count}`;

    return (
      <span style={{ color: "#fff" }}>
        {anime.status === 2 ? "??" : episode}/
        {anime.status === 0 ? episode : "??"}
      </span>
    );
  };

  useEffect(() => {
    mounted.current = true;
    loadAnime();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, []);

  const loadAnime = async () => {
    const page = Math.floor(Math.random() * 10);
    const path = `anime?formats=0&page=${page}&per_page=10`;
    const { response, isError } = await animeData.getAnimeData(path);
    if (mounted.current) {
      if (isError || response?.status_code !== 200) {
        setLoading(true);
      } else {
        setAnimeList(response.data.documents);
        setLoading(false);
      }
    }
  };

  return (
    <div className="px-xl-3 px-lg-2">
      <div className="intro mt-lg-3">
        <div className="intro-content">
          <span>Recommended</span>
        </div>
      </div>
      <div className="recommend-section">
        {!loading &&
          animeList.map((data) => {
            return (
              <div
                className="d-flex flex-wrap recommend-anime-wrapper mb-4"
                style={{ overflow: "hidden" }}
                key={data.id}
              >
                <div
                  className="recommend-img mr-4"
                  style={{ cursor: "pointer" }}
                >
                  <NavLink to={`/anime/${data.id}`}>
                    <img src={data.cover_image} alt="" title={data.titles.en} />
                  </NavLink>
                </div>
                <div className="recommend-info">
                  <p className="recommend-title" title={data.titles.en}>
                    <NavLink to={`/anime/${data.id}`} className="text-white">
                      {data.titles.en}
                    </NavLink>
                  </p>
                  <i className="fas fa-star banner-slide-info-score mr-1"></i>
                  <span className="banner-slide-info-score">
                    {data.score / 10}
                  </span>
                  <i className="far fa-clock mr-1 ml-3"></i>
                  {episodeCount(data)}
                </div>
              </div>
            );
          })}

        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
            return <SideBarAnimeSkeleton key={n} />;
          })}
      </div>
    </div>
  );
}

export default memo(Sidebar);
