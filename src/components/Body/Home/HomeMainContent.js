import React, { memo } from "react";
import HomeComingSection from "./HomeComingSection";
import HomeNewSection from "./HomeNewSection";
import LazyLoad from "react-lazyload";

function HomeMainContent() {
  return (
    <div className="col-12 col-lg-8 p-0">
      <section className="p-0">
        <LazyLoad>
          <HomeNewSection></HomeNewSection>
        </LazyLoad>
      </section>
      <section className="pb-0">
        <LazyLoad>
          <HomeComingSection></HomeComingSection>
        </LazyLoad>
      </section>
    </div>
  );
}

export default memo(HomeMainContent);
