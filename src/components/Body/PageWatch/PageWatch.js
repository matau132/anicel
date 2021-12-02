import React, { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router";
import AnimeData from "../../../api/GetData";

function PageWatch({ animeSource, animeName }) {
  const { id, episode } = useParams();
  const { pathname, search } = useLocation();
  const [episodeLink, setEpisodeLink] = useState("");
  const animeData = new AnimeData();
  const mounted = useRef(true);

  const getAnimeEpisode = async () => {
    const param = new URLSearchParams(search);
    const source = param.get("source") || animeSource;
    const path = `episode?anime_id=${id}&number=${episode}&source=${source}`;
    const { response, isError } = await animeData.getAnimeData(path);
    if (mounted.current) {
      if (!isError && response?.status_code === 200) {
        setEpisodeLink(response.data.documents[0].video);
      } else {
        setEpisodeLink("");
      }
    }
  };

  const handleStart = () => {
    const recentlyList = JSON.parse(localStorage.getItem("recently_watched"));
    if (recentlyList) {
      let newList = recentlyList.filter((anime) => anime.id !== id);
      newList = [{ id, episode }, ...newList];
      if (newList.length > 10) {
        newList = newList.slice(0, 10);
      }
      localStorage.setItem("recently_watched", JSON.stringify(newList));
    } else {
      localStorage.setItem(
        "recently_watched",
        JSON.stringify([{ id, episode }])
      );
    }
  };

  useEffect(() => {
    mounted.current = true;
    getAnimeEpisode();
    document.title = `${animeName} - Episode ${episode} - Anicel`;

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, [id, episode, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);

  return (
    <>
      <ReactPlayer
        url={episodeLink}
        controls={true}
        width="100%"
        height="auto"
        playsinline={true}
        onStart={handleStart}
      ></ReactPlayer>
    </>
  );
}

export default memo(PageWatch);
