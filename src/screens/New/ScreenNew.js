import React, { useLayoutEffect } from "react";
import PageLayout from "../../components/Body/PageLayout/PageLayout";

function ScreenNew() {
  useLayoutEffect(() => {
    document.title = "New & Hot Anime - Anicel";
  }, []);
  
  return <PageLayout title="New Anime" status={1} format={0}></PageLayout>;
}

export default ScreenNew;
