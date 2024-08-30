import React, { useState } from "react";
import { Link } from "react-router-dom";

const Naviagtion = ({ handleLogout, user }) => {
  return (
    <nav>
      <div className="nav-center">
        <div>
          <Link to="/" className="nav-item">
            Home
          </Link>
        </div>
        <div>
          {user ? (
            <div className="nav-links-con">
              <Link to="/favorite" className="nav-item">
                Favorite
              </Link>
              <Link to="/search" className="nav-item">
                Search
              </Link>
              <button className="primary-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-links-con">
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Naviagtion;
