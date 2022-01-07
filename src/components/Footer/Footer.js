import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

function Footer() {
  return (
    <footer className="footer-area">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Logo */}
                <NavLink
                  to="/"
                  className="navbar-brand d-block"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "55px",
                    height: "55px",
                  }}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </NavLink>
                <p>Anicel - Make anime great again!</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">Useful Links</h4>
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/new">New</NavLink>
                  </li>
                  <li>
                    <NavLink to="/trending">Trending</NavLink>
                  </li>
                  <li>
                    <NavLink to="/movie">Movie</NavLink>
                  </li>
                  <li>
                    <NavLink to="/coming-soon">Coming soon</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">Community</h4>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">Facebook</a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/" target="_blank">Youtube</a>
                  </li>
                  <li>
                    <a href="https://discord.com/" target="_blank">Discord</a>
                  </li>
                  <li>
                    <a href="https://github.com/" target="_blank">Github</a>
                  </li>
                  <li>
                    <a href="https://stackoverflow.com/" target="_blank">Stack Overflow</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">Subscribe Us</h4>
                {/* Subscribe Form */}
                <div className="subscribe-form d-flex align-items-center">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="info@yourmail.com"
                  />
                  <button className="btn">
                    <i className="far fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Copyright Area */}
              <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                {/* Copyright Left */}
                <div className="copyright-left">
                  ©2021 Anicel, All Rights Reserved.
                </div>
                {/* Copyright Right */}
                <div className="copyright-right">
                  Powered by <i className="fas fa-heart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
