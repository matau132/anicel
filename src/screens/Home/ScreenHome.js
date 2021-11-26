import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Banner from "../../components/Body/Home/Banner";
import HomeMainContent from "../../components/Body/Home/HomeMainContent";
import RecentlyWatched from "../../components/Body/Home/RecentlyWatched";
import Sidebar from "../../components/Body/Home/Sidebar";

function ScreenHome() {
  const [recentFlag, setRecentFlag] = useState(false);

  useLayoutEffect(() => {
    document.title = "Anicel - Anime Engsub Online";
  }, []);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("recently_watched"));
    if (list && list.length > 0) {
      setRecentFlag(true);
    }
  }, []);

  return (
    <>
      <Banner></Banner>
      <div className="container">
        {recentFlag && <RecentlyWatched></RecentlyWatched>}
        <section className="p-0">
          <div className="row">
            <HomeMainContent></HomeMainContent>
            <aside className="col-12 col-lg-4 pl-lg-5 p-0 float-right sidebar">
              <LazyLoad>
                <Sidebar></Sidebar>
              </LazyLoad>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}

export default memo(ScreenHome);
