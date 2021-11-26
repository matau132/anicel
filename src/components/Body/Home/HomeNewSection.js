import React, { memo, useEffect, useRef, useState } from "react";
import "./HomeNewSection.css";
import Card from "../../UI/Card";
import CardSkeleton from "../../UI/CardSkeleton";
import { NavLink } from "react-router-dom";
import AnimeData from "../../../api/GetData";

function HomeNewSection() {
  const [animeList, setAnimeList] = useState([]);
  const [animeType, setAnimeType] = useState(1);
  const [loading, setLoading] = useState(true);
  const animeData = new AnimeData();

  const mounted = useRef(false);

  const getCurrentSeason = (month) => {
    if (month >= 2 && month <= 4) {
      return 1;
    } else if (month >= 5 && month <= 7) {
      return 2;
    } else if (month >= 8 && month <= 10) {
      return 3;
    } else {
      return 0;
    }
  };

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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentSeason = getCurrentSeason(currentDate.getMonth());

    switch (type) {
      case 1:
        path = `anime?formats=0&status=1&page=1&per_page=9`;
        break;
      case 2:
        path = `anime?formats=0&page=1&per_page=9&year=${
          currentSeason === 0 ? currentYear - 1 : currentYear
        }&season=${currentSeason === 0 ? 3 : currentSeason - 1}`;
        break;
      default:
        path = `anime?formats=2&page=1&per_page=9`;
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
          <h3 className="mt-3 mb-0">New & Hot</h3>
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
                <h5 className="m-0">Last season</h5>
              </button>
            </li>
            <li>
              <button
                className="item-nav"
                data-toggle="pill"
                onClick={() => {
                  setAnimeType(3);
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
                <div className="col-lg-4 col-md-4 col-4 mb-3" key={data.id}>
                  <Card anime={data} rating={true}></Card>
                </div>
              );
            })}
          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
              return (
                <div className="col-lg-4 col-md-4 col-4 mb-3" key={n}>
                  <CardSkeleton></CardSkeleton>
                </div>
              );
            })}
        </div>
        <div className="intro-btn d-flex justify-content-end mt-3 pr-4">
          <NavLink exact to="/new" className="btn content-btn">
            View All
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default memo(HomeNewSection);
