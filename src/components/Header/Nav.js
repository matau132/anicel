import React, { memo, useEffect, useRef } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

function Nav() {
  const navbar = useRef();
  useEffect(() => {
    //scroll menu event
    let initialScrollPosition = window.scrollY;
    if (initialScrollPosition > 0) {
      navbar.current.style.display = "none";
    }

    const handleWindowScroll = (e) => {
      let scrollPosition = window.scrollY;
      if (!navbar.current.classList.contains("relative")) {
        if (scrollPosition > initialScrollPosition) {
          navbar.current.style.display = "none";
        } else {
          if (scrollPosition < 76) {
            navbar.current.style.display = "flex";
            navbar.current.classList.remove("navbar-sticky");
          } else {
            navbar.current.style.display = "flex";
            navbar.current.classList.add("navbar-sticky");
          }
        }
      }
      initialScrollPosition = scrollPosition;
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    /* Navbar */
    <nav className="navbar navbar-expand" ref={navbar}>
      <div className="container header">
        {/* Navbar Brand*/}
        <NavLink className="navbar-brand mr-auto" to="/" exact>
          <div
            style={{ borderRadius: "50%", overflow: "hidden", width: "55px" }}
          >
            <img className="navbar-brand-sticky" src={logo} alt="" />
          </div>
        </NavLink>
        {/* Navbar */}
        <ul className="navbar-nav items mx-auto">
          <li className="nav-item">
            <NavLink activeClassName="active" exact to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              exact
              to="/new"
              className="nav-link"
            >
              New
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              exact
              to="/trending"
              className="nav-link"
            >
              Trending
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              exact
              to="/movie"
              className="nav-link"
            >
              Movie
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              exact
              to="/coming-soon"
              className="nav-link"
            >
              Coming Soon
            </NavLink>
          </li>
        </ul>
        {/* Navbar Icons */}
        <ul className="navbar-nav icons ml-auto">
          <li className="nav-item">
            <span
              className="nav-link"
              data-toggle="modal"
              data-target="#search"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-search" />
            </span>
          </li>
        </ul>
        {/* Navbar Toggler */}
        <ul className="navbar-nav toggle">
          <li className="nav-item">
            <span
              className="nav-link"
              data-toggle="modal"
              data-target="#menu"
              style={{ cursor: "pointer", marginTop: "5px" }}
            >
              <i className="fas fa-bars toggle-icon m-0" />
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default memo(Nav);
