import React, { memo, useLayoutEffect } from "react";
import PageLayout from "../../components/Body/PageLayout/PageLayout";

function ScreenComingSoon() {
  useLayoutEffect(() => {
    document.title = "Coming Soon Anime - Anicel";
  }, []);

  return (
    <PageLayout
      title="Coming Soon Anime"
      status={2}
      format="0,1,2,3"
    ></PageLayout>
  );
}

export default memo(ScreenComingSoon);
