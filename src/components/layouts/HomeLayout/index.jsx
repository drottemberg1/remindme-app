import React, { useState } from "react";
import "./HomeLayout.styles.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const HomeLayout = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav>
      {/* logo */}
      <div className="logo">
        <span>R</span>emindMe
      </div>
      <div
        className="hamburger"
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      {/* Dialogue box Nav List */}
      {navOpen && (
        <div
          className="nav-box"
          onClick={() => {
            setNavOpen(!navOpen);
          }}
        >
          <div className="nav-list-box">
            <Link className="nav-list-item-ham" to="/">
              Home
            </Link>
            <Link className="nav-list-item-ham" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-list-item-ham" to="/about">
              About
            </Link>
          </div>
        </div>
      )}

      {/* Static List */}
      <div className="nav-list">
        <Link className="nav-list-item" to="/">
          Home
        </Link>

        <Link className="nav-list-item" to="/about">
          About
        </Link>

      </div>

      <div className="auth-btn">
        <Link className="sign-up" to="/signup">Sign Up</Link>
        <Link className="sign-in" to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default HomeLayout;