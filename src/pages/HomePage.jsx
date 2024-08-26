import React from "react";
import { Link } from "react-router-dom";


const HomePage = ({ }) => {
  return (
    <>
      <section className="">
        <div className="">
          <p className="">
            <span>Plan Your Perfect Getaway</span>
          </p>
        </div>

        
          <div>
            <p className="">Start exploring</p>
            <div className="">
              <Link to="/search">
                <button className="">Search</button>
              </Link>
              <Link to="/favorite">
                <button className="">Favorite</button>
              </Link>
            </div>
          </div>
        
      </section>
      
    </>
  );
};

export default HomePage;
