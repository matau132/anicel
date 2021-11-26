import React from "react";
import { Switch, Route } from "react-router-dom";
import ScreenComingSoon from "./ComingSoon/ScreenComingSoon";
import ScreenDetail from "./Detail/ScreenDetail";
import ScreenHome from "./Home/ScreenHome";
import ScreenMovie from "./Movie/ScreenMovie";
import ScreenNew from "./New/ScreenNew";
import ScreenTrending from "./Trending/ScreenTrending";
import ScreenWatch from "./Watch/ScreenWatch";
import ScreenError from "./Error/ScreenError";
import ScreenSearch from "./Search/ScreenSearch";

function ScreenRoot() {
  return (
    <Switch>
      <Route path="/" exact component={ScreenHome} />
      <Route path="/new" component={ScreenNew} />
      <Route path="/trending" component={ScreenTrending} />
      <Route path="/movie" component={ScreenMovie} />
      <Route path="/coming-soon" component={ScreenComingSoon} />
      <Route path="/anime/:id" component={ScreenDetail} />
      <Route path="/watch/:id/:episode" component={ScreenWatch} />
      <Route path="/search" component={ScreenSearch} />
      <Route path="/404" component={ScreenError} />
      <Route component={ScreenError} />
    </Switch>
  );
}

export default ScreenRoot;
