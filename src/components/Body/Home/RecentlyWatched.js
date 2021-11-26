import React, { memo, useEffect, useRef, useState } from "react";
import "./RecentlyWatched.css";
import Card from "../../UI/Card";
import AnimeData from "../../../api/GetData";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination]);

function RecentlyWatched() {
  const [recentlyList, setRecentlyList] = useState([]);
  const [progressbar, setProgressbar] = useState(false);
  const animeData = new AnimeData();

  const mounted = useRef(false);

  const settings = {
    spaceBetween: 30,
    pagination: progressbar,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      575: {
        slidesPerView: 3,
      },
      1: {
        slidesPerView: 2,
      },
    },
  };

  const loadAnime = async () => {
    const list = JSON.parse(localStorage.getItem("recently_watched"));

    if (list) {
      const ids = list.map((anime) => parseInt(anime.id));
      const path = `anime?ids=${ids.toString()}`;
      const { response, isError } = await animeData.getAnimeData(path);
      if (mounted.current) {
        if (!isError && response.status_code === 200) {
          const rawList = response.data.documents;
          const newList = list.map((data) => {
            for (let anime of rawList) {
              if (parseInt(data.id) === anime.id) {
                return { ...anime, watched: parseInt(data.episode) };
              }
            }
          });
          setRecentlyList(newList);

          if (window.screen.width > 575) {
            if (window.screen.width > 1023) {
              if (list.length > 4) {
                setProgressbar({ type: "progressbar" });
              }
            } else {
              if (list.length > 3) {
                setProgressbar({ type: "progressbar" });
              }
            }
          } else {
            if (list.length > 2) {
              setProgressbar({ type: "progressbar" });
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    mounted.current = true;
    loadAnime();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, []);

  return (
    <section className="recently-watched-wrapper pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>Anime</span>
                <h3 className="mt-3 mb-0">Recently Watched</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Swiper {...settings} className="mySwiper" key={recentlyList.length}>
            {recentlyList.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <div className="recently-card">
                    <Card anime={data} rating={false} watching={true}></Card>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default memo(RecentlyWatched);
