import React from "react";
import { Link } from "react-router-dom";


const HomePage = ({ user }) => {
  return (
    <>
      <section className="home-hero-section section-center">
        <div className="landing-text-con">
          <p className="landing-text">
            <span>Plan Your Perfect Getaway</span>
            <br />
            Check real-time weather conditions for your dream destinations, and
            save your favorite spots to make your vacation planning a breeze!
          </p>
        </div>

        {user ? (
          <div>
            <p className="btn-text">Start exploring</p>
            <div className="home-btn-con">
              <Link to="/search">
                <button className="primary-btn">Search</button>
              </Link>
              <Link to="/favorite">
                <button className="secondary-btn">Favorite</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="btn-text">Create an account/login to get started</p>
            <div className="home-btn-con">
              <Link to="/login">
                <button className="primary-btn">Login</button>
              </Link>
              <Link to="/register">
                <button className="secondary-btn">Register</button>
              </Link>
            </div>
          </div>
        )}
      </section>
      <div className="instruction-con">
        <section className="section-center">
          <h1 className="instruction-heading-text">How it works</h1>
          <div className="card-container">
            {/*INSTRUCTION CARDS */}
            {instructionsData.map((item, i) => (
              <div className="instruction-card" key={i}>
                <h1 className="instruction-heading">{item.heading}</h1>
                <p className="heading-text-content">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

