import React, { memo, useEffect, useRef, useState } from "react";
import "./HomeNewSection.css";
import Card from "../../UI/Card";
import CardSkeleton from "../../UI/CardSkeleton";
import { NavLink } from "react-router-dom";
import AnimeData from "../../../api/GetData";

function HomeComingSection() {
  const [animeList, setAnimeList] = useState([]);
  const [animeType, setAnimeType] = useState(1);
  const [loading, setLoading] = useState(true);
  const animeData = new AnimeData();

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    loadAnime(animeType);

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [animeType]);

  const loadAnime = async (type) => {
    let path;
    switch (type) {
      case 1:
        path = `anime?status=2&page=1&per_page=9`;
        break;
      default:
        path = `anime?formats=2&status=2&page=1&per_page=9`;
        break;
    }

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
    <>
      <div className="intro d-flex justify-content-between align-items-end m-0">
        <div className="intro-content">
          <span>Anime</span>
          <h3 className="mt-3 mb-0">Coming soon</h3>
        </div>
        <div className="home-content-nav">
          <ul className="nav">
            <li>
              <button
                className="item-nav active"
                data-toggle="pill"
                onClick={() => {
                  setAnimeType(1);
                  setLoading(true);
                }}
              >
                <h5 className="m-0">All</h5>
              </button>
            </li>
            <li>
              <button
                className="item-nav"
                data-toggle="pill"
                onClick={() => {
                  setAnimeType(2);
                  setLoading(true);
                }}
              >
                <h5 className="m-0">Movie</h5>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="home-new-anime mt-4">
        <div className="row">
          {!loading &&
            animeList.map((data) => {
              return (
                <div className="col-lg-4 col-md-4 col-6 mb-3" key={data.id}>
                  <Card anime={data} rating={true}></Card>
                </div>
              );
            })}
          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
              return (
                <div className="col-lg-4 col-md-4 col-6 mb-3" key={n}>
                  <CardSkeleton></CardSkeleton>
                </div>
              );
            })}
        </div>
        <div className="intro-btn d-flex justify-content-end mt-3 pr-4">
          <NavLink className="btn content-btn" exact to="/coming-soon">
            View All
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default memo(HomeComingSection);
