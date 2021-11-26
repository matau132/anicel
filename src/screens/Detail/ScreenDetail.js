import React, { memo } from "react";
import { useParams } from "react-router";
import AnimeDetail from "../../components/Body/PageAnimeDetail/AnimeDetail";

function ScreenDetail() {
  const { id } = useParams();

  return <AnimeDetail id={id}></AnimeDetail>;
}

export default memo(ScreenDetail);
