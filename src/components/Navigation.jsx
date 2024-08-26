import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ }) => {
  return (
    <nav>
      <div className="">
        <div>
          <Link to="/" className="">
            Home
          </Link>
        </div>
        <div>
            <div className="">
              <Link to="/favorite" className="">
                Favorite
              </Link>
              <Link to="/search" className="">
                Search
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
