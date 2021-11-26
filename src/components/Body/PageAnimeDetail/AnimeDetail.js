import React, { memo, useEffect, useRef, useState } from "react";
import "./AnimeDetail.css";
import { NavLink, useHistory } from "react-router-dom";
import { Fragment } from "react";
import Card from "../../UI/Card";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimeData from "../../../api/GetData";

function AnimeDetail({ id }) {
  const history = useHistory();
  const [anime, setAnime] = useState(null);
  const [status, setStatus] = useState({});
  const [trailerUrl, setTrailerUrl] = useState();
  const [prequelAnime, setPrequelAnime] = useState();
  const [sequelAnime, setSequelAnime] = useState();
  const [hasEpisode, setHasEpisode] = useState(true);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);
  const loadingProgress = useRef(null);
  const animeData = new AnimeData();

  const getStatus = (statusId) => {
    switch (statusId) {
      case 0:
        setStatus({
          text: "Finished",
          color: "#20c997",
        });
        break;
      case 1:
        setStatus({
          text: "Releasing",
          color: "#4528dc",
        });
        break;
      case 2:
        setStatus({
          text: "Not yet release",
          color: "#ffc107",
        });
        break;
      case 3:
        setStatus({
          text: "Cancelled",
          color: "#dc3545",
        });
        break;
      default:
        return;
    }
  };

  const getFormat = (format) => {
    switch (format) {
      case 0:
        return "TV";
      case 1:
        return "TV Short";
      case 2:
        return "Movie";
      case 3:
        return "Special";
      case 4:
        return "OVA";
      case 5:
        return "ONA";
      default:
        return "Music";
    }
  };

  const getSeason = (season) => {
    switch (season) {
      case 0:
        return "Winter";
      case 1:
        return "Spring";
      case 2:
        return "Summer";
      case 3:
        return "Fall";
      default:
        return "Unknown";
    }
  };

  const getTrailer = (embedUrl) => {
    const url = embedUrl.replace("https://www.youtube.com/embed/", "");
    const trailer = `https://www.youtube.com/watch?v=${url}`;
    setTrailerUrl(trailer);
  };

  const handleResponse = async (response) => {
    if (mounted.current) {
      setAnime(response.data);
      getStatus(response.data.status);
      if (response.data.trailer_url) {
        getTrailer(response.data.trailer_url);
      }
      if (!response.data.trailer_url && trailerUrl) {
        setTrailerUrl();
      }
      if (response.data.sequel) {
        const path = `anime/${response.data.sequel}`;
        const { response: sequel } = await animeData.getAnimeData(path);
        if (sequel?.status_code === 200) {
          setSequelAnime(sequel.data);
        }
      }
      if (!response.data.sequel && sequelAnime) {
        setSequelAnime();
      }
      if (response.data.prequel) {
        const path = `anime/${response.data.prequel}`;
        const { response: prequel } = await animeData.getAnimeData(path);
        if (prequel?.status_code === 200) {
          setPrequelAnime(prequel.data);
        }
      }
      if (!response.data.prequel && prequelAnime) {
        setPrequelAnime();
      }
    }
  };

  const asyncUseEffect = async () => {
    const path = `anime/${id}`;
    const { response, isError } = await animeData.getAnimeData(path);
    if (isError || response?.status_code !== 200) history.push("/404");
    else {
      if (mounted.current) {
        handleResponse(response);
        const episodePath = `episode?anime_id=${id}&locale=en`;
        const { response: EpisodeRes } = await animeData.getAnimeData(
          episodePath
        );
        if (mounted.current) {
          if (EpisodeRes.status_code === 200) {
            setHasEpisode(true);
          } else {
            setHasEpisode(false);
          }
          setLoading(false);
          loadingProgress.current?.complete();
          document.title = `${response.data.titles.en} - Anicel`;
        }
      }
    }
  };

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    loadingProgress.current.staticStart();
    asyncUseEffect();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [id]);

  return (
    <>
      <LoadingBar color="#80f" ref={loadingProgress} />
      {!loading && (
        <div className="anime-detail-wrapper">
          <div className="anime-detail-banner position-relative">
            <img src={anime.banner_image} alt="Banner"></img>
            <div className="anime-detail-banner-overlay"></div>
          </div>
          <div className="container">
            <div className="anime-detail-basic-info">
              <div className="d-flex flex-md-row flex-column justify-content-start">
                <div className="position-relative mx-md-0 mx-auto">
                  <div className="anime-detail-image">
                    <img src={anime.cover_image} alt="Cover"></img>
                  </div>
                </div>
                <div className="position-relative px-4 py-5 mx-md-0 mx-auto">
                  <div className="text-center text-md-left">
                    {hasEpisode && (
                      <NavLink
                        to={`/watch/${anime.id}/1`}
                        exact
                        className="btn anime-detail-watch-btn mx-auto"
                      >
                        <span>
                          <i className="fas fa-play mr-3"></i>Watch
                        </span>
                      </NavLink>
                    )}
                    {anime.trailer_url && (
                      <a
                        className={`btn anime-detail-watch-btn ${
                          hasEpisode && "ml-2 ml-sm-3"
                        }`}
                        href={trailerUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>
                          <i className="fas fa-play mr-3"></i>Trailer
                        </span>
                      </a>
                    )}
                  </div>
                  <h4 className="font-weight-bold text-center text-md-left">
                    {anime.titles.en}
                  </h4>
                  <div className="text-center text-md-left">
                    {anime.genres.slice(0, 4).map((genre, index) => {
                      return (
                        <Fragment key={genre}>
                          <span className="anime-detail-genre">{genre}</span>
                          {index !== 3 && (
                            <div className="d-inline-block rounded-separator mx-2"></div>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: anime.descriptions.en }}
                    style={{ color: "rgba(209,213,219,1)" }}
                    className="mt-3 text-center text-md-left"
                  ></div>
                  <div
                    className="d-flex flex-wrap mt-4 justify-content-center justify-content-md-start  text-center text-md-left"
                    style={{ color: "rgba(156,163,175,1)" }}
                  >
                    <div className="mx-2 mr-md-5 mx-md-0">
                      <p className="mb-0">Episodes</p>
                      <p className="mt-2">{anime.episodes_count}</p>
                    </div>
                    <div className="mx-2 mr-md-5 mx-md-0">
                      <p className="mb-0">Episode duration</p>
                      <p className="mt-2">{anime.episode_duration} mins</p>
                    </div>
                    <div className="mx-2 mr-md-5 mx-md-0">
                      <p className="mb-0">Status</p>
                      <p className="mt-2" style={{ color: status.color }}>
                        {status.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="anime-detail-more-info mt-4">
              <div className="row">
                <div className="col-12 col-md-3 mb-4 mb-md-0 anime-detail-advance-info">
                  <div className="mb-3">
                    <p className="font-weight-bold">Type</p>
                    <p>{getFormat(anime.format)}</p>
                  </div>
                  <div className="mb-3">
                    <p className="font-weight-bold">Japanese</p>
                    <p>{anime.titles.jp}</p>
                  </div>
                  <div className="mb-3">
                    <p className="font-weight-bold">Romanji</p>
                    <p>{anime.titles.en}</p>
                  </div>
                  <div className="mb-3">
                    <p className="font-weight-bold">Season</p>
                    <p>{`${getSeason(anime.season_period)} ${
                      anime.season_year
                    }`}</p>
                  </div>
                  <div className="mb-3">
                    <p className="font-weight-bold">Score</p>
                    <p>{anime.score / 10}</p>
                  </div>
                </div>
                <div className="col-12 col-md-9 anime-detail-related">
                  <h4 className="mt-0">Related Anime</h4>
                  <div className="row">
                    {sequelAnime && (
                      <div className="col-6 col-sm-4">
                        <Card
                          anime={sequelAnime}
                          rating={false}
                          watching={false}
                        ></Card>
                      </div>
                    )}
                    {prequelAnime && (
                      <div className="col-6 col-sm-4">
                        <Card
                          anime={prequelAnime}
                          rating={false}
                          watching={false}
                        ></Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center">
            <div className="row justify-content-center">
              <Skeleton width={185} height={300} className="mx-auto"></Skeleton>
              <div className="mt-md-4 ml-3">
                <div className="row justify-content-center justify-content-sm-start">
                  <Skeleton width={70} height={30} className="mr-2"></Skeleton>
                  <Skeleton width={70} height={30}></Skeleton>
                </div>
                <div className="mt-md-3">
                  <Skeleton width={280} count={4}></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AnimeDetail);
