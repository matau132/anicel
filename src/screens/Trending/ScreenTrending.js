import React, { memo, useLayoutEffect } from "react";
import PageLayout from "../../components/Body/PageLayout/PageLayout";

function ScreenTrending() {
  useLayoutEffect(() => {
    document.title = "Trending Anime - Anicel";
  }, []);

  return <PageLayout title="Trending Anime" format={0}></PageLayout>;
}

export default memo(ScreenTrending);
