import React, { memo, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import PageWatch from "../../components/Body/PageWatch/PageWatch";
import AnimeData from "../../api/GetData";
import { NavLink } from "react-router-dom";
import "./ScreenWatch.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingBar from "react-top-loading-bar";

function ScreenWatch() {
  const { id, episode } = useParams();
  const history = useHistory();
  const [animeSource, setAnimeSource] = useState([]);
  const [anime, setAnime] = useState({});
  const [episodeSource, setEpisodeSource] = useState();
  const [loading, setLoading] = useState(true);
  const animeData = new AnimeData();
  const loadingProgress = useRef();
  const mounted = useRef(false);

  const getAnimeSource = async () => {
    const episodePath = `episode?anime_id=${id}&locale=en`;
    const animePath = `anime/${id}`;
    const promise1 = animeData.getAnimeData(episodePath);
    const promise2 = animeData.getAnimeData(animePath);
    Promise.all([promise1, promise2])
      .then(async (response) => {
        if (mounted.current) {
          const { response: animeRes } = response[0];
          if (animeRes?.status_code === 200) {
            const sourcePath = `resources/1.0/2`;
            const { response: episodeRes } = response[1];
            setAnime(episodeRes.data);
            const { response: sourceRes, isError: sourceErr } =
              await animeData.getAnimeData(sourcePath);
            const epsSource = sourceRes.data.sources.reduce((final, source) => {
              if (source.i18n === "en") {
                return [...final, source.name];
              }
              return [...final];
            }, []);
            setAnimeSource(epsSource);
            setEpisodeSource(epsSource[0]);
          } else {
            history.push("/404");
          }
        }
      })
      .catch((err) => {
        history.push("/404");
      })
      .finally(() => {
        if (mounted.current) {
          setLoading(false);
          loadingProgress.current?.complete();
        }
      });
  };

  useEffect(() => {
    mounted.current = true;
    loadingProgress.current?.staticStart();
    setLoading(true);
    getAnimeSource();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LoadingBar color="#80f" ref={loadingProgress} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {!loading && (
              <>
                <h4 className="mb-5 watch-anime-title">{`${anime?.titles?.en} - Episode ${episode}`}</h4>
                <PageWatch animeSource={episodeSource} animeName={anime.titles.en}></PageWatch>
                <div className="episode-wrapper mt-5">
                  {animeSource.map((source) => {
                    return (
                      <div key={source} className="mb-3">
                        <p className="watch-anime-source font-weight-bold">
                          {source}
                        </p>
                        <div className="d-flex flex-wrap">
                          {Array(anime.episodes_count)
                            .fill("", 0)
                            .map((episode, index) => {
                              return (
                                <div key={index} className="mr-3 mb-3">
                                  <NavLink
                                    className="btn episode-btn d-flex justify-content-center align-items-center"
                                    to={`/watch/${id}/${
                                      index + 1
                                    }?source=${source}`}
                                    isActive={(key, { pathname, search }) => {
                                      return (
                                        pathname + search ===
                                        `/watch/${id}/${
                                          index + 1
                                        }?source=${source}`
                                      );
                                    }}
                                    activeStyle={{ background: "#57048a" }}
                                  >
                                    {index + 1}
                                  </NavLink>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {loading && (
              <>
                <div className="d-flex justify-content-center">
                  <div style={{ width: 700 }}>
                    <Skeleton width="60%"></Skeleton>
                    <Skeleton height={400}></Skeleton>
                    <div className="d-flex flex-wrap mt-2">
                      <Skeleton
                        width={60}
                        height={40}
                        className="mr-3"
                      ></Skeleton>
                      <Skeleton
                        width={60}
                        height={40}
                        className="mr-3"
                      ></Skeleton>
                      <Skeleton
                        width={60}
                        height={40}
                        className="mr-3"
                      ></Skeleton>
                      <Skeleton
                        width={60}
                        height={40}
                        className="mr-3"
                      ></Skeleton>
                      <Skeleton
                        width={60}
                        height={40}
                        className="mr-3"
                      ></Skeleton>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ScreenWatch);
