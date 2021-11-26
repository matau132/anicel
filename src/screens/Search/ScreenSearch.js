import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import PageLayout from "../../components/Body/PageLayout/PageLayout";

function ScreenSearch() {
  const { search } = useLocation();
  const [searchName, setSearchName] = useState(() => {
    const param = new URLSearchParams(search);
    return param.get("name");
  });

  useLayoutEffect(() => {
    document.title = "Search Anime - Anicel";
  }, []);

  useEffect(() => {
    const param = new URLSearchParams(search);
    setSearchName(param.get("name"));
  }, [search]);

  return <PageLayout title="Search" searchName={searchName}></PageLayout>;
}

export default memo(ScreenSearch);
