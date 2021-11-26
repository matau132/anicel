import React, { memo, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResponsiveMenu() {
  const closeMenuRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    closeMenuRef.current.click();
  }, [pathname]);

  return (
    <div id="menu" className="modal fade p-0">
      <div className="modal-dialog dialog-animated">
        <div className="modal-content h-100">
          <div className="modal-header" data-dismiss="modal">
            Menu{" "}
            <i className="far fa-times-circle icon-close" ref={closeMenuRef} />
          </div>
          <div className="menu modal-body">
            <ul className="navbar-nav items mx-auto">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  exact
                  to="/"
                  className="nav-link"
                >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ResponsiveMenu);
