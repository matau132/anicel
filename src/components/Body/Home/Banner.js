import React, { memo, useEffect, useReducer, useRef } from "react";
import Slider from "react-slick";
import "./Banner.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingBar from "react-top-loading-bar";
import { NavLink } from "react-router-dom";
import AnimeData from "../../../api/GetData";

const initBanner = {
  data: [],
  loading: true,
  loadingProgress: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return {
        data: action.data || state.data,
        loading: false,
        loadingProgress: 100,
      };
    case "INCOMPLETE":
      return { ...state, loading: true, loadingProgress: 100 };
    case "INITIALLOADING":
      return { ...state, loadingProgress: 40 };
    default:
      return state;
  }
};

function Banner() {
  const [bannerAnime, dispatchBannerAnime] = useReducer(reducer, initBanner);
  const mounted = useRef(false);
  const animeData = new AnimeData();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    customPaging: (i) => <div className="custom-banner-pagination"></div>,
  };

  useEffect(() => {
    mounted.current = true;
    dispatchBannerAnime({ type: "INITIALLOADING" });
    loadBanner();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, []);

  const loadBanner = async () => {
    const currentYear = new Date().getFullYear();
    const path = `anime?page=1&per_page=10&sort_fields=score&sort_directions=-1&year=${currentYear}&status=1`;

    const { response, isError } = await animeData.getAnimeData(path);
    if (isError || response?.status_code !== 200) {
      if (mounted.current)
        dispatchBannerAnime({
          type: "INCOMPLETE",
        });
    } else {
      if (mounted.current)
        dispatchBannerAnime({
          type: "COMPLETE",
          data: response.data.documents,
        });
    }
  };

  return (
    <section className="pt-0">
      <LoadingBar color="#80f" progress={bannerAnime.loadingProgress} />
      <Slider {...settings}>
        {!bannerAnime.loading &&
          bannerAnime.data.map((data) => {
            return (
              <div key={data.id}>
                <div className="banner-slide-wrapper">
                  <div className="banner-slide-info">
                    <div className="mb-2">
                      <NavLink
                        to={`/anime/${data.id}`}
                        className="banner-slide-info-title "
                      >
                        {data.titles.en}
                      </NavLink>
                    </div>
                    <div className="d-flex banner-slide-extra-info">
                      <div className="mr-4">
                        <i className="fas fa-star banner-slide-info-score mr-1"></i>
                        <span className="banner-slide-info-score">
                          {data.score / 10}
                        </span>
                      </div>
                      <div className="mr-4">
                        <i className="far fa-clock mr-1"></i>
                        <span style={{ color: "#fff" }}>
                          {data.episodes_count < 10
                            ? `0${data.episodes_count}`
                            : `${data.episodes_count}`}
                          /??
                        </span>
                      </div>
                      <div>
                        <i className="far fa-calendar-alt mr-1"></i>
                        <span style={{ color: "#fff" }}>
                          {data.season_year}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p
                        className="banner-slide-des mt-3"
                        dangerouslySetInnerHTML={{
                          __html: data.descriptions.en,
                        }}
                      ></p>
                    </div>
                    <div className="mt-3 banner-slide-genre">
                      <span className="mr-2">Genres:</span>
                      {data.genres.slice(0, 3).map((genre) => (
                        <span key={genre} className="mr-1">
                          {genre},
                        </span>
                      ))}
                      ...
                    </div>
                    <div className="col-12 input-group align-self-center pl-0">
                      <NavLink
                        className="btn btn-bordered-white mt-4 banner-slide-watch-button"
                        to={`/anime/${data.id}`}
                      >
                        Watch now!
                      </NavLink>
                    </div>
                  </div>
                  <div className="banner-img-wrapper">
                    <img src={data.banner_image} alt="Banner" />
                  </div>
                </div>
              </div>
            );
          })}

        {bannerAnime.loading && (
          <div className="banner-slide-wrapper">
            <div className="banner-slide-info">
              <Skeleton width="60%" height={30} />
              <div className="my-1">
                <Skeleton width="25%" />
              </div>
              <Skeleton width="80%" height={120} />
            </div>
          </div>
        )}
      </Slider>
    </section>
  );
}

export default memo(Banner);
