import React, { memo, useEffect, useRef, useState } from "react";
import SearchDetail from "../ListDetail/SearchDetail";
import ListAnimeDetail from "../ListDetail/ListAnimeDetail";
import CardSkeleton from "../../UI/CardSkeleton";
import LoadingBar from "react-top-loading-bar";
import _ from "lodash";
import AnimeData from "../../../api/GetData";
import { useHistory, useLocation } from "react-router";

function PageLayout({ title, status = "", format, searchName }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [season, setSeason] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const loadingProgress = useRef(null);
  const firstRender = useRef(true);
  const hasMore = useRef(true);
  const animeData = new AnimeData();
  const { pathname } = useLocation();
  const history = useHistory();

  const mounted = useRef(false);
  const getSeason = useRef((seasonName) => {
    switch (seasonName) {
      case "Spring":
        return 1;
      case "Summer":
        return 2;
      case "Autumn":
        return 3;
      case "Winter":
        return 4;
      default:
        return "";
    }
  });

  const loadMore = () => {
    setIsScroll(true);
    setPage((prevPage) => prevPage + 1);
  };

  const searchProps = useRef({
    setName,
    setGenre,
    setYear,
    setSeason,
  });

  const getAnimeData = (name, genre, year, season, page) => {
    let path;
    if (!name && !genre && !year && !season) {
      if (pathname.includes("/search"))
        path = `anime?title=${searchName || ""}&page=${page}&per_page=12`;
      else
        path = `anime?status=${status}&formats=${format}&page=${page}&per_page=12`;
    } else {
      path =
        `anime?page=${page}&per_page=12` +
        (name ? `&title=${name}` : ``) +
        (genre ? `&genres=${genre}` : ``) +
        (year ? `&year=${year}` : ``) +
        (season ? `&season=${getSeason.current(season)}` : ``);
    }
    return animeData.getAnimeData(path);
  };

  const firstRenderList = async () => {
    loadingProgress.current.staticStart();
    let path;
    if (pathname.includes("/search")) {
      path = `anime?title=${searchName || ""}&page=${page}&per_page=12`;
    } else {
      path = `anime?status=${status}&formats=${format}&page=${page}&per_page=12`;
    }
    const { response, isError } = await animeData.getAnimeData(path);
    if (mounted.current) {
      if (isError || response?.status_code !== 200) {
        setAnimeList([]);
      } else {
        setAnimeList(() => {
          let newList = response.data.documents;
          return _.uniqBy(newList, "id");
        });
      }
      loadingProgress.current.complete();
      setLoading(false);
    }
  };

  const handleAnimeData = async () => {
    if (!firstRender.current) {
      const { response, isError } = await getAnimeData(
        name,
        genre,
        year,
        season,
        1
      );
      if (mounted.current) {
        if (!isError) {
          if (response?.data.last_page === 1 || response?.status_code !== 200) {
            hasMore.current = false;
          }
          if (response?.status_code === 200) {
            setAnimeList(() => {
              let newList = response?.data.documents;
              return _.uniqBy(newList, "id");
            });
          } else {
            setAnimeList([]);
          }
        }
        setLoading(false);
      }
    } else firstRender.current = false;
  };

  const handleScrollData = async () => {
    if (isScroll) {
      const { response, isError } = await getAnimeData(
        name,
        genre,
        year,
        season,
        page
      );
      if (mounted.current) {
        if (!isError) {
          if (
            page === response?.data.last_page ||
            response?.status_code !== 200
          ) {
            hasMore.current = false;
          }
          if (response?.status_code === 200) {
            setAnimeList((prevList) => {
              const newList = [...prevList, ...response.data.documents];
              return _.uniqBy(newList, "id");
            });
          }
        }
        setIsScroll(false);
      }
    }
  };

  useEffect(() => {
    mounted.current = true;
    firstRenderList();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      history.push("/search");
    }
  }, [name, genre, year, season]);

  useEffect(() => {
    mounted.current = true;
    hasMore.current = true;
    setPage(1);
    setIsScroll(false);
    setLoading(true);
    handleAnimeData();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [name, genre, year, season, searchName]);

  useEffect(() => {
    mounted.current = true;
    handleScrollData();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [page]);

  return (
    <>
      <LoadingBar color="#80f" ref={loadingProgress} />
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="title">{title}</h3>
              <div>
                <SearchDetail {...searchProps.current}></SearchDetail>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 px-0">
              {!loading && (
                <ListAnimeDetail
                  animeList={animeList}
                  loadMore={loadMore}
                  hasMore={hasMore.current}
                ></ListAnimeDetail>
              )}
              {(loading || isScroll) && (
                <div className="row">
                  {[1, 2, 3, 4].map((n) => {
                    return (
                      <div className="col-lg-3 col-md-4 col-6 mb-3" key={n}>
                        <CardSkeleton></CardSkeleton>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(PageLayout);
