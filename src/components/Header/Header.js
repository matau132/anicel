import React, { memo } from "react";
import Nav from "./Nav";
import ResponsiveMenu from "./ResponsiveMenu";
import Search from "./Search";

function Header() {
  return (
    <>
      <header id="header">
        <Nav></Nav>
      </header>
      <Search></Search>
      <ResponsiveMenu></ResponsiveMenu>
    </>
  );
}

export default memo(Header);
