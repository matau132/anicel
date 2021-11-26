import React, { memo, useLayoutEffect } from "react";
import PageLayout from "../../components/Body/PageLayout/PageLayout";

function ScreenMovie() {
  useLayoutEffect(() => {
    document.title = "Anime Movie - Anicel";
  }, []);

  return <PageLayout title="Anime Movie" format={2}></PageLayout>;
}

export default memo(ScreenMovie);
